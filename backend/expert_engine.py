"""Rule-based + scoring expert engine (forward chaining).
Mirror logic dari src/lib/expertSystem.ts agar konsisten dengan UI.
"""
from typing import List, Optional
from pydantic import BaseModel
from stocks_data import SAMPLE_STOCKS


class InferenceInput(BaseModel):
    risk: str  # konservatif | moderat | agresif
    goal: str  # dividen | value | growth | trading
    min_dividend: Optional[float] = None
    max_per: Optional[float] = None
    sectors: Optional[List[str]] = None


class Recommendation(BaseModel):
    ticker: str
    name: str
    sector: str
    score: int
    verdict: str
    reasons: List[str]
    rules_fired: List[str]


def _verdict(score: int) -> str:
    if score >= 80: return "STRONG BUY"
    if score >= 65: return "BUY"
    if score >= 45: return "HOLD"
    return "SELL"


def run_expert_system(inp: InferenceInput) -> List[Recommendation]:
    stocks = SAMPLE_STOCKS
    if inp.sectors:
        stocks = [s for s in stocks if s["sector"] in inp.sectors]

    out = []
    for s in stocks:
        score = 50
        reasons, fired = [], []

        # === FUNDAMENTAL ===
        if s["per"] < 10:
            score += 12; reasons.append(f"PER {s['per']} sangat menarik (undervalued)."); fired.append("R01: PER<10 → +12")
        elif s["per"] < 15:
            score += 6; fired.append("R02: PER<15 → +6")
        elif s["per"] > 25:
            score -= 8; reasons.append(f"PER {s['per']} tinggi (overvalued)."); fired.append("R03: PER>25 → -8")

        if s["pbv"] < 1:
            score += 10; reasons.append(f"PBV {s['pbv']} < 1, di bawah nilai buku."); fired.append("R04: PBV<1 → +10")
        elif s["pbv"] > 5:
            score -= 6; fired.append("R05: PBV>5 → -6")

        if s["roe"] > 20:
            score += 12; reasons.append(f"ROE {s['roe']}% sangat tinggi."); fired.append("R06: ROE>20 → +12")
        elif s["roe"] > 15:
            score += 7; fired.append("R07: ROE>15 → +7")
        elif s["roe"] < 10:
            score -= 5; fired.append("R08: ROE<10 → -5")

        if s["der"] < 0.5:
            score += 6; fired.append("R09: DER rendah → +6")
        elif s["der"] > 1.5:
            score -= 8; reasons.append(f"DER {s['der']} tinggi (utang besar)."); fired.append("R10: DER>1.5 → -8")

        # === TEKNIKAL (output dari modul C++) ===
        if s["rsi"] < 30:
            score += 10; reasons.append(f"RSI {s['rsi']} oversold."); fired.append("R11: RSI<30 → +10")
        elif s["rsi"] > 70:
            score -= 10; reasons.append(f"RSI {s['rsi']} overbought."); fired.append("R12: RSI>70 → -10")

        if s["macd_signal"] == "bullish":
            score += 8; fired.append("R13: MACD bullish → +8")
        elif s["macd_signal"] == "bearish":
            score -= 8; fired.append("R14: MACD bearish → -8")

        if s["ma50_trend"] == "up":
            score += 5; fired.append("R15: MA50 uptrend → +5")
        elif s["ma50_trend"] == "down":
            score -= 5; fired.append("R16: MA50 downtrend → -5")

        # === GOAL ===
        if inp.goal == "dividen" and s["dividend_yield"] >= 5:
            score += 12; reasons.append(f"Yield {s['dividend_yield']}% cocok income."); fired.append("R17: goal dividen & yield≥5 → +12")
        if inp.goal == "value" and s["per"] < 12 and s["pbv"] < 2:
            score += 10; reasons.append("Memenuhi kriteria value investing."); fired.append("R18: goal value → +10")
        if inp.goal == "growth" and s["roe"] > 18:
            score += 8; fired.append("R19: goal growth & ROE>18 → +8")
        if inp.goal == "trading" and s["macd_signal"] == "bullish" and s["rsi"] < 65:
            score += 10; reasons.append("Setup teknikal bagus untuk trading."); fired.append("R20: goal trading → +10")

        # === RISK ===
        if inp.risk == "konservatif":
            if s["market_cap"] >= 100:
                score += 6; fired.append("R21: konservatif & big cap → +6")
            else:
                score -= 6; fired.append("R22: konservatif & small cap → -6")
            if s["der"] > 1:
                score -= 8; fired.append("R23: konservatif & DER>1 → -8")
        elif inp.risk == "agresif":
            if s["rsi"] < 40 or s["rsi"] > 60:
                score += 4; fired.append("R24: agresif & momentum → +4")

        # === USER FILTERS ===
        if inp.min_dividend and s["dividend_yield"] < inp.min_dividend:
            score -= 15; reasons.append(f"Yield di bawah target {inp.min_dividend}%."); fired.append("R25: yield<target → -15")
        if inp.max_per and s["per"] > inp.max_per:
            score -= 10; fired.append("R26: PER>target → -10")

        score = max(0, min(100, score))
        if not reasons:
            reasons.append("Profil saham relatif netral terhadap kriteria.")

        out.append(Recommendation(
            ticker=s["ticker"], name=s["name"], sector=s["sector"],
            score=score, verdict=_verdict(score),
            reasons=reasons, rules_fired=fired,
        ))

    out.sort(key=lambda r: r.score, reverse=True)
    return out
