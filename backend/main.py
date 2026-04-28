"""FastAPI app — entrypoint backend SahamPakar."""
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr

import database as db
from auth import (
    hash_password, verify_password, create_access_token, get_current_user_id,
)
from stocks_data import SAMPLE_STOCKS
from expert_engine import InferenceInput, run_expert_system
from technical_bridge import compute_technical

app = FastAPI(title="SahamPakar API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    db.init_db()


# ===== Schemas =====
class RegisterIn(BaseModel):
    email: EmailStr
    name: str
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ===== Auth =====
@app.post("/auth/register", response_model=TokenOut)
def register(body: RegisterIn):
    if db.get_user_by_email(body.email):
        raise HTTPException(400, "Email sudah terdaftar")
    if len(body.password) < 6:
        raise HTTPException(400, "Password minimal 6 karakter")
    uid = db.create_user(body.email, body.name, hash_password(body.password))
    return TokenOut(access_token=create_access_token(uid, body.email))


@app.post("/auth/login", response_model=TokenOut)
def login(form: OAuth2PasswordRequestForm = Depends()):
    user = db.get_user_by_email(form.username)
    if not user or not verify_password(form.password, user["password_hash"]):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Email atau password salah")
    return TokenOut(access_token=create_access_token(user["id"], user["email"]))


@app.get("/auth/me")
def me(uid: int = Depends(get_current_user_id)):
    user = db.get_user_by_id(uid)
    if not user:
        raise HTTPException(404, "User tidak ditemukan")
    return {"id": user["id"], "email": user["email"], "name": user["name"]}


# ===== Stocks =====
@app.get("/stocks")
def list_stocks(_: int = Depends(get_current_user_id)):
    return SAMPLE_STOCKS


@app.get("/stocks/{ticker}/technical")
def technical(ticker: str, _: int = Depends(get_current_user_id)):
    """Indikator teknikal — dihitung oleh modul C++."""
    try:
        return compute_technical(ticker)
    except Exception as e:
        raise HTTPException(500, str(e))


# ===== Expert System =====
@app.post("/expert/analyze")
def analyze(body: InferenceInput, _: int = Depends(get_current_user_id)):
    return run_expert_system(body)


@app.get("/")
def root():
    return {"app": "SahamPakar API", "docs": "/docs"}
