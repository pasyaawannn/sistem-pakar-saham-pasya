"""Wrapper Python untuk memanggil modul C++ technical/indicators.

Cara kerja:
1. Generate / ambil price history dari stocks_data.
2. Pass ke binary C++ via stdin (CSV harga).
3. Parse output JSON dari C++.
"""
import json
import subprocess
from pathlib import Path
from stocks_data import generate_price_history

CPP_BINARY = Path(__file__).parent / "technical" / "indicators"


def compute_technical(ticker: str) -> dict:
    """Panggil binary C++ untuk hitung RSI, MACD, MA50."""
    prices = generate_price_history(ticker, days=60)
    if not prices:
        raise ValueError(f"Ticker {ticker} tidak ditemukan")

    if not CPP_BINARY.exists():
        raise RuntimeError(
            f"Binary C++ belum di-compile. Jalankan: cd backend/technical && make"
        )

    csv = ",".join(str(p) for p in prices)
    proc = subprocess.run(
        [str(CPP_BINARY)],
        input=csv,
        capture_output=True,
        text=True,
        timeout=10,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"C++ module error: {proc.stderr}")

    return json.loads(proc.stdout)
