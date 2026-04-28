"""Sample data saham IDX. Mirror src/lib/expertSystem.ts SAMPLE_STOCKS."""

SAMPLE_STOCKS = [
    {"ticker": "BBCA", "name": "Bank Central Asia", "sector": "Perbankan", "price": 9850, "per": 22.4, "pbv": 4.6, "roe": 21.5, "der": 0.18, "dividend_yield": 2.4, "rsi": 58, "macd_signal": "bullish", "ma50_trend": "up", "market_cap": 1215},
    {"ticker": "BBRI", "name": "Bank Rakyat Indonesia", "sector": "Perbankan", "price": 4720, "per": 12.1, "pbv": 2.3, "roe": 19.8, "der": 0.22, "dividend_yield": 6.1, "rsi": 52, "macd_signal": "neutral", "ma50_trend": "sideways", "market_cap": 715},
    {"ticker": "BMRI", "name": "Bank Mandiri", "sector": "Perbankan", "price": 6300, "per": 11.5, "pbv": 2.1, "roe": 18.4, "der": 0.24, "dividend_yield": 5.4, "rsi": 61, "macd_signal": "bullish", "ma50_trend": "up", "market_cap": 588},
    {"ticker": "TLKM", "name": "Telkom Indonesia", "sector": "Telekomunikasi", "price": 2780, "per": 13.8, "pbv": 2.4, "roe": 16.2, "der": 0.65, "dividend_yield": 5.8, "rsi": 38, "macd_signal": "bearish", "ma50_trend": "down", "market_cap": 275},
    {"ticker": "ASII", "name": "Astra International", "sector": "Aneka Industri", "price": 5025, "per": 8.2, "pbv": 1.1, "roe": 14.5, "der": 0.78, "dividend_yield": 7.2, "rsi": 44, "macd_signal": "neutral", "ma50_trend": "sideways", "market_cap": 203},
    {"ticker": "UNVR", "name": "Unilever Indonesia", "sector": "Konsumen", "price": 2240, "per": 25.6, "pbv": 18.2, "roe": 71.2, "der": 1.85, "dividend_yield": 4.1, "rsi": 32, "macd_signal": "bearish", "ma50_trend": "down", "market_cap": 85},
    {"ticker": "ICBP", "name": "Indofood CBP", "sector": "Konsumen", "price": 11250, "per": 16.8, "pbv": 3.2, "roe": 19.4, "der": 0.92, "dividend_yield": 2.8, "rsi": 55, "macd_signal": "bullish", "ma50_trend": "up", "market_cap": 131},
    {"ticker": "GGRM", "name": "Gudang Garam", "sector": "Konsumen", "price": 16800, "per": 14.2, "pbv": 0.8, "roe": 5.8, "der": 0.42, "dividend_yield": 5.2, "rsi": 41, "macd_signal": "neutral", "ma50_trend": "sideways", "market_cap": 32},
    {"ticker": "ANTM", "name": "Aneka Tambang", "sector": "Pertambangan", "price": 1565, "per": 11.4, "pbv": 1.6, "roe": 14.8, "der": 0.36, "dividend_yield": 3.4, "rsi": 67, "macd_signal": "bullish", "ma50_trend": "up", "market_cap": 38},
    {"ticker": "PTBA", "name": "Bukit Asam", "sector": "Pertambangan", "price": 2680, "per": 4.8, "pbv": 1.4, "roe": 30.2, "der": 0.15, "dividend_yield": 12.5, "rsi": 48, "macd_signal": "neutral", "ma50_trend": "sideways", "market_cap": 31},
    {"ticker": "INDF", "name": "Indofood Sukses Makmur", "sector": "Konsumen", "price": 6750, "per": 7.4, "pbv": 1.0, "roe": 14.2, "der": 0.74, "dividend_yield": 4.6, "rsi": 53, "macd_signal": "bullish", "ma50_trend": "up", "market_cap": 59},
    {"ticker": "KLBF", "name": "Kalbe Farma", "sector": "Kesehatan", "price": 1620, "per": 22.1, "pbv": 3.5, "roe": 16.8, "der": 0.21, "dividend_yield": 2.2, "rsi": 46, "macd_signal": "neutral", "ma50_trend": "sideways", "market_cap": 76},
]


def get_stock(ticker: str):
    for s in SAMPLE_STOCKS:
        if s["ticker"].upper() == ticker.upper():
            return s
    return None


# Sample harga historis (60 hari) untuk feed ke modul C++.
# Di production ini akan diambil dari data feed real.
import math
import random

def generate_price_history(ticker: str, days: int = 60):
    """Generate deterministic-ish price history seeded by ticker."""
    stock = get_stock(ticker)
    if not stock:
        return []
    seed = sum(ord(c) for c in ticker)
    rng = random.Random(seed)
    base = stock["price"]
    prices = []
    p = base * 0.92
    for i in range(days):
        change = rng.uniform(-0.025, 0.028) + math.sin(i / 8) * 0.005
        p = max(1, p * (1 + change))
        prices.append(round(p, 2))
    prices[-1] = base  # akhirnya konvergen ke harga sekarang
    return prices
