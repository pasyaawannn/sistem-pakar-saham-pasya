# Modul C++ — Indikator Teknikal

Modul kalkulasi indikator teknikal saham (RSI, MACD, Moving Average) dalam C++17.
Dipanggil dari backend Python via `subprocess`.

## Compile

```bash
make
```

Menghasilkan binary `./indicators`.

## Test manual

```bash
make test
```

## Cara dipakai dari Python

Lihat `backend/technical_bridge.py`. Singkatnya:

```python
import subprocess
csv_prices = "100,101,99,102,..."
proc = subprocess.run(["./indicators"], input=csv_prices,
                      capture_output=True, text=True)
result = json.loads(proc.stdout)
# {"rsi":..., "macd":..., "macd_signal":"bullish", "ma50":..., "ma50_trend":"up", ...}
```

## Mengapa C++?

Indikator teknikal beroperasi pada time-series yang panjang (intraday tick
bisa jutaan data point). C++ dipilih untuk:

- **Performa** — loop EMA & RSI berjalan native tanpa overhead interpreter.
- **Determinisme** — perhitungan numerik konsisten lintas platform.
- **Demonstrasi multi-bahasa** — sesuai requirement tugas (Python + C++).
