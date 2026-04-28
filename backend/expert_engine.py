"""Expert system: Rule-Based + Forward Chaining + Certainty Factor.
Mirror dari src/lib/expertSystem.ts agar konsisten frontend & backend.
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from stocks_data import SAMPLE_STOCKS


class InferenceInput(BaseModel):
    risk: str
    goal: str
    min_dividend: Optional[float] = None
    max_per: Optional[float] = None
    sectors: Optional[List[str]] = None


class Rule(BaseModel):
    id: str
    category: str
    premise: str
    conclusion: str
    weight: float
    cf: float


# === KNOWLEDGE BASE ===
KNOWLEDGE_BASE: List[Rule] = [
    # FUNDAMENTAL
    Rule(id="R01", category="Fundamental", premise="PER < 10",                  conclusion="Saham undervalued",            weight=14, cf=0.85),
    Rule(id="R02", category="Fundamental", premise="10 ≤ PER < 15",             conclusion="Valuasi wajar",                weight=6,  cf=0.70),
    Rule(id="R03", category="Fundamental", premise="PER > 25",                  conclusion="Saham overvalued",             weight=-10, cf=0.80),
    Rule(id="R04", category="Fundamental", premise="PBV < 1",                   conclusion="Harga di bawah nilai buku",    weight=12, cf=0.85),
    Rule(id="R05", category="Fundamental", premise="PBV > 5",                   conclusion="Premium tinggi atas nilai buku", weight=-7, cf=0.75),
    Rule(id="R06", category="Fundamental", premise="ROE > 20%",                 conclusion="Manajemen sangat efisien",     weight=14, cf=0.90),
    Rule(id="R07", category="Fundamental", premise="15% < ROE ≤ 20%",           conclusion="Profitabilitas baik",          weight=8,  cf=0.80),
    Rule(id="R08", category="Fundamental", premise="ROE < 10%",                 conclusion="Profitabilitas lemah",         weight=-8,  cf=0.80),
    Rule(id="R09", category="Fundamental", premise="ROE negatif",               conclusion="Perusahaan rugi",              weight=-20, cf=0.95),
    Rule(id="R10", category="Fundamental", premise="DER < 0.5",                 conclusion="Struktur modal sehat",         weight=7,  cf=0.80),
    Rule(id="R11", category="Fundamental", premise="DER > 1.5",                 conclusion="Beban utang tinggi",           weight=-10, cf=0.85),
    Rule(id="R12", category="Fundamental", premise="Net profit growth > 20%",   conclusion="Pertumbuhan laba kuat",        weight=10, cf=0.85),
    Rule(id="R13", category="Fundamental", premise="Net profit growth < -10%",  conclusion="Laba turun signifikan",        weight=-10, cf=0.85),
    # TEKNIKAL
    Rule(id="R14", category="Teknikal", premise="RSI < 30 (oversold)",          conclusion="Potensi rebound",              weight=10, cf=0.75),
    Rule(id="R15", category="Teknikal", premise="RSI > 70 (overbought)",        conclusion="Risiko koreksi tinggi",        weight=-10, cf=0.75),
    Rule(id="R16", category="Teknikal", premise="MACD bullish crossover",       conclusion="Momentum naik",                weight=9,  cf=0.70),
    Rule(id="R17", category="Teknikal", premise="MACD bearish crossover",       conclusion="Momentum turun",               weight=-9,  cf=0.70),
    Rule(id="R18", category="Teknikal", premise="MA50 trend up",                conclusion="Tren menengah naik",           weight=6,  cf=0.75),
    Rule(id="R19", category="Teknikal", premise="MA50 trend down",              conclusion="Tren menengah turun",          weight=-6,  cf=0.75),
    Rule(id="R20", category="Teknikal", premise="Volume strength = high",       conclusion="Konfirmasi minat pasar",       weight=4,  cf=0.65),
    Rule(id="R21", category="Teknikal", premise="Volume strength = low",        conclusion="Likuiditas rendah",            weight=-4,  cf=0.65),
    # TUJUAN
    Rule(id="R22", category="Tujuan", premise="Goal=Dividen ∧ Yield ≥ 5%",      conclusion="Cocok untuk passive income",   weight=12, cf=0.90),
    Rule(id="R23", category="Tujuan", premise="Goal=Value ∧ PER<12 ∧ PBV<2",    conclusion="Memenuhi value investing",     weight=12, cf=0.85),
    Rule(id="R24", category="Tujuan", premise="Goal=Growth ∧ ROE>18 ∧ Growth>15%", conclusion="Memenuhi growth investing", weight=12, cf=0.85),
    Rule(id="R25", category="Tujuan", premise="Goal=Trading ∧ MACD bullish ∧ RSI<65", conclusion="Setup trading bagus",    weight=10, cf=0.75),
    # RISIKO
    Rule(id="R26", category="Risiko", premise="Risiko=Konservatif ∧ MarketCap≥100T", conclusion="Big cap aman",            weight=7,  cf=0.85),
    Rule(id="R27", category="Risiko", premise="Risiko=Konservatif ∧ MarketCap<100T", conclusion="Terlalu kecil",           weight=-7,  cf=0.80),
    Rule(id="R28", category="Risiko", premise="Risiko=Konservatif ∧ DER>1",     conclusion="Risiko utang tinggi",          weight=-10, cf=0.85),
    Rule(id="R29", category="Risiko", premise="Risiko=Konservatif ∧ Beta<0.9",  conclusion="Volatilitas rendah",           weight=5,  cf=0.75),
    Rule(id="R30", category="Risiko", premise="Risiko=Agresif ∧ Beta>1.3",      conclusion="Sesuai profil agresif",        weight=6,  cf=0.75),
    Rule(id="R31", category="Risiko", premise="Risiko=Agresif ∧ MACD bullish ∧ RSI 40-65", conclusion="Momentum kuat",     weight=5,  cf=0.75),
    # FILTER
    Rule(id="R32", category="Filter", premise="Yield < target user",            conclusion="Tidak penuhi target dividen",  weight=-15, cf=0.95),
    Rule(id="R33", category="Filter", premise="PER > batas user",               conclusion="Melebihi batas valuasi",       weight=-12, cf=0.95),
]

RULE_MAP = {r.id: r for r in KNOWLEDGE_BASE}


class Recommendation(BaseModel):
    ticker: str
    name: str
    sector: str
    score: int
    confidence: int
    verdict: str
    time_horizon: str
    entry_price: float
    target_price: float
    stop_loss: float
    potential_return: float
    reasons: List[str]
    fired_rules: List[Dict[str, Any]]
    trace: List[str]


def _verdict(score: int) -> str:
    if score >= 80: return "STRONG BUY"
    if score >= 65: return "BUY"
    if score >= 45: return "HOLD"
    if score >= 30: return "SELL"
    return "STRONG SELL"


def _fire(fired, trace, rule_id, fact):
    r = RULE_MAP[rule_id]
    contrib = r.weight * r.cf
    fired.append({"id": r.id, "category": r.category, "premise": r.premise, "conclusion": r.conclusion, "weight": r.weight, "cf": r.cf, "contribution": round(contrib, 2)})
    sign = "+" if contrib >= 0 else ""
    trace.append(f"[{r.id}] {fact} ⇒ {r.conclusion} ({sign}{contrib:.2f} | CF={r.cf})")


def run_expert_system(inp: InferenceInput) -> List[Recommendation]:
    stocks = SAMPLE_STOCKS
    if inp.sectors:
        stocks = [s for s in stocks if s["sector"] in inp.sectors]

    out: List[Recommendation] = []
    for s in stocks:
        fired: list = []
        trace: list = []
        reasons: list = []

        trace.append(f"▶ Memulai inferensi {s['ticker']} ({s['name']})")
        trace.append(f"  WM: PER={s['per']}, PBV={s['pbv']}, ROE={s['roe']}, DER={s['der']}, Yield={s['dividend_yield']}, RSI={s['rsi']}")

        # FUNDAMENTAL
        if 0 < s["per"] < 10:
            _fire(fired, trace, "R01", f"PER={s['per']} < 10"); reasons.append(f"PER {s['per']} undervalued.")
        elif 0 < s["per"] < 15:
            _fire(fired, trace, "R02", f"PER={s['per']} wajar")
        elif s["per"] > 25:
            _fire(fired, trace, "R03", f"PER={s['per']} > 25"); reasons.append(f"PER {s['per']} tinggi.")

        if s["pbv"] < 1:
            _fire(fired, trace, "R04", f"PBV={s['pbv']} < 1"); reasons.append(f"PBV {s['pbv']} di bawah nilai buku.")
        elif s["pbv"] > 5:
            _fire(fired, trace, "R05", f"PBV={s['pbv']} > 5")

        if s["roe"] < 0:
            _fire(fired, trace, "R09", f"ROE={s['roe']}% (negatif)"); reasons.append("Perusahaan masih rugi.")
        elif s["roe"] > 20:
            _fire(fired, trace, "R06", f"ROE={s['roe']}% > 20%"); reasons.append(f"ROE {s['roe']}% sangat tinggi.")
        elif s["roe"] > 15:
            _fire(fired, trace, "R07", f"ROE={s['roe']}%")
        elif s["roe"] < 10:
            _fire(fired, trace, "R08", f"ROE={s['roe']}% < 10%")

        if s["der"] < 0.5:
            _fire(fired, trace, "R10", f"DER={s['der']} < 0.5")
        elif s["der"] > 1.5:
            _fire(fired, trace, "R11", f"DER={s['der']} > 1.5"); reasons.append(f"DER {s['der']} tinggi.")

        if s["net_profit_growth"] > 20:
            _fire(fired, trace, "R12", f"Growth {s['net_profit_growth']}%"); reasons.append(f"Laba tumbuh {s['net_profit_growth']}% YoY.")
        elif s["net_profit_growth"] < -10:
            _fire(fired, trace, "R13", f"Growth {s['net_profit_growth']}%"); reasons.append(f"Laba turun {s['net_profit_growth']}% YoY.")

        # TEKNIKAL
        if s["rsi"] < 30:
            _fire(fired, trace, "R14", f"RSI={s['rsi']} oversold"); reasons.append(f"RSI {s['rsi']} oversold.")
        elif s["rsi"] > 70:
            _fire(fired, trace, "R15", f"RSI={s['rsi']} overbought"); reasons.append(f"RSI {s['rsi']} overbought.")

        if s["macd_signal"] == "bullish":
            _fire(fired, trace, "R16", "MACD bullish")
        elif s["macd_signal"] == "bearish":
            _fire(fired, trace, "R17", "MACD bearish")

        if s["ma50_trend"] == "up":
            _fire(fired, trace, "R18", "MA50 up")
        elif s["ma50_trend"] == "down":
            _fire(fired, trace, "R19", "MA50 down")

        if s["volume_strength"] == "high":
            _fire(fired, trace, "R20", "Volume tinggi")
        elif s["volume_strength"] == "low":
            _fire(fired, trace, "R21", "Volume rendah")

        # GOAL
        if inp.goal == "dividen" and s["dividend_yield"] >= 5:
            _fire(fired, trace, "R22", f"Goal dividen & yield {s['dividend_yield']}%"); reasons.append(f"Yield {s['dividend_yield']}% cocok income.")
        if inp.goal == "value" and 0 < s["per"] < 12 and s["pbv"] < 2:
            _fire(fired, trace, "R23", "PER<12 & PBV<2"); reasons.append("Memenuhi value investing.")
        if inp.goal == "growth" and s["roe"] > 18 and s["net_profit_growth"] > 15:
            _fire(fired, trace, "R24", f"ROE {s['roe']}% & growth {s['net_profit_growth']}%"); reasons.append("Memenuhi growth investing.")
        if inp.goal == "trading" and s["macd_signal"] == "bullish" and s["rsi"] < 65:
            _fire(fired, trace, "R25", "MACD bullish & RSI<65"); reasons.append("Setup trading bagus.")

        # RISK
        if inp.risk == "konservatif":
            if s["market_cap"] >= 100:
                _fire(fired, trace, "R26", f"MarketCap {s['market_cap']}T")
            else:
                _fire(fired, trace, "R27", f"MarketCap {s['market_cap']}T")
            if s["der"] > 1:
                _fire(fired, trace, "R28", f"DER {s['der']}")
            if s["beta"] < 0.9:
                _fire(fired, trace, "R29", f"Beta {s['beta']}")
        elif inp.risk == "agresif":
            if s["beta"] > 1.3:
                _fire(fired, trace, "R30", f"Beta {s['beta']}")
            if s["macd_signal"] == "bullish" and 40 <= s["rsi"] <= 65:
                _fire(fired, trace, "R31", "Momentum bullish")

        # USER FILTER
        if inp.min_dividend and s["dividend_yield"] < inp.min_dividend:
            _fire(fired, trace, "R32", f"Yield<{inp.min_dividend}%"); reasons.append(f"Yield di bawah target {inp.min_dividend}%.")
        if inp.max_per and s["per"] > inp.max_per:
            _fire(fired, trace, "R33", f"PER>{inp.max_per}")

        total = sum(f["contribution"] for f in fired)
        score = max(0, min(100, round(50 + total)))
        confidence = round(sum(f["cf"] for f in fired) / len(fired) * 100) if fired else 50
        verdict = _verdict(score)

        if inp.goal == "trading":
            horizon = "Trading (1-4 minggu)"
        elif inp.goal == "value":
            horizon = "Jangka Panjang (>1 tahun)"
        elif inp.goal == "dividen":
            horizon = "Jangka Menengah (3-12 bulan)"
        else:
            horizon = "Jangka Pendek (1-3 bulan)"

        upside = (score - 50) / 100
        target = round(s["price"] * (1 + max(0.03, upside * 0.4)))
        stop = round(s["price"] * 0.93)
        ret = round((target - s["price"]) / s["price"] * 100, 1)

        if not reasons:
            reasons.append("Profil saham relatif netral terhadap kriteria.")
        trace.append(f"◆ Total kontribusi: {total:.2f} → Skor: {score}/100 → {verdict}")

        out.append(Recommendation(
            ticker=s["ticker"], name=s["name"], sector=s["sector"],
            score=score, confidence=confidence, verdict=verdict,
            time_horizon=horizon,
            entry_price=s["price"], target_price=target, stop_loss=stop,
            potential_return=ret,
            reasons=reasons, fired_rules=fired, trace=trace,
        ))

    out.sort(key=lambda r: r.score, reverse=True)
    return out
