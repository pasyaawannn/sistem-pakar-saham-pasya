# SahamPakar — Backend (Python + C++)

Backend untuk sistem pakar saham IDX. Komponen:

- **FastAPI** — REST API (auth, expert engine, stocks)
- **JWT** — autentikasi token-based
- **SQLite** — penyimpanan user
- **C++ module** (`technical/`) — perhitungan indikator teknikal RSI, MACD, Moving Average. Dipanggil dari Python via `subprocess`.
- **Rule-based + scoring engine** (`expert_engine.py`) — forward chaining rules dengan skor 0–100.

## Struktur

```
backend/
├── requirements.txt
├── main.py              # FastAPI app + endpoints
├── auth.py              # JWT, hash password, dependency
├── database.py          # SQLite (sqlite3 stdlib)
├── expert_engine.py     # Rule engine (mirror src/lib/expertSystem.ts)
├── stocks_data.py       # Data sampel saham IDX
├── technical/
│   ├── indicators.cpp   # RSI, MACD, MA50 — C++17
│   ├── Makefile
│   └── README.md
└── README.md
```

## Cara menjalankan

### 1. Compile modul C++

```bash
cd backend/technical
make            # menghasilkan ./indicators
```

### 2. Install dependensi Python

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Jalankan server

```bash
uvicorn main:app --reload --port 8000
```

API tersedia di `http://localhost:8000`. Dokumentasi otomatis di `http://localhost:8000/docs`.

## Endpoint utama

| Method | Path | Auth | Deskripsi |
|--------|------|------|-----------|
| POST | `/auth/register` | – | Daftar user baru |
| POST | `/auth/login` | – | Login → return JWT |
| GET  | `/auth/me` | ✅ | Info user saat ini |
| GET  | `/stocks` | ✅ | Daftar saham IDX |
| GET  | `/stocks/{ticker}/technical` | ✅ | Indikator teknikal (RSI/MACD/MA) — **dari C++** |
| POST | `/expert/analyze` | ✅ | Jalankan mesin pakar dengan kriteria user |

## Integrasi dengan frontend

Saat ini frontend (`src/lib/auth.ts` & `src/lib/expertSystem.ts`) memakai logika
client-side agar demo web langsung jalan. Untuk produksi, ganti fungsi-fungsi
tersebut dengan `fetch("http://localhost:8000/...")` menggunakan token JWT.

## Catatan untuk dosen

- Bahasa **Python** dipakai untuk: API, autentikasi JWT, database, mesin
  inferensi (forward chaining + scoring rule-based).
- Bahasa **C++** dipakai untuk: perhitungan indikator teknikal (RSI, MACD, Moving Average)
  yang dipanggil Python via `subprocess`. Pemilihan C++ untuk modul ini karena
  kalkulasi numerik time-series butuh performa tinggi.
- Metode sistem pakar: **rule-based + scoring** (kombinasi). Lihat `expert_engine.py`.
