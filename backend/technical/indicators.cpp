// SahamPakar — Indikator Teknikal (RSI, MACD, MA50)
// Dipanggil dari Python via subprocess.
// Input  : stdin, CSV harga (cth: "100.5,101.2,...")
// Output : stdout, JSON {"rsi":..., "macd":..., "macd_signal_line":..., "macd_signal":"bullish/bearish/neutral", "ma50":..., "ma50_trend":"up/down/sideways"}
//
// Compile: g++ -std=c++17 -O2 -o indicators indicators.cpp
//
// Mata Kuliah: Kecerdasan Buatan — modul perhitungan numerik berperforma tinggi
// memilih C++ karena indikator teknikal pada time-series butuh efisiensi.

#include <iostream>
#include <sstream>
#include <vector>
#include <string>
#include <cmath>
#include <iomanip>

using std::vector;

// ---------- Simple Moving Average ----------
double sma(const vector<double>& v, size_t period) {
    if (v.size() < period) return 0.0;
    double sum = 0.0;
    for (size_t i = v.size() - period; i < v.size(); ++i) sum += v[i];
    return sum / period;
}

// ---------- Exponential Moving Average (full series) ----------
vector<double> ema_series(const vector<double>& v, size_t period) {
    vector<double> out(v.size(), 0.0);
    if (v.empty()) return out;
    double k = 2.0 / (period + 1.0);
    out[0] = v[0];
    for (size_t i = 1; i < v.size(); ++i) {
        out[i] = v[i] * k + out[i - 1] * (1.0 - k);
    }
    return out;
}

// ---------- RSI (Wilder) ----------
double rsi(const vector<double>& v, size_t period = 14) {
    if (v.size() <= period) return 50.0;
    double gain = 0.0, loss = 0.0;
    for (size_t i = 1; i <= period; ++i) {
        double diff = v[i] - v[i - 1];
        if (diff >= 0) gain += diff; else loss -= diff;
    }
    double avg_gain = gain / period;
    double avg_loss = loss / period;
    for (size_t i = period + 1; i < v.size(); ++i) {
        double diff = v[i] - v[i - 1];
        double g = diff > 0 ? diff : 0.0;
        double l = diff < 0 ? -diff : 0.0;
        avg_gain = (avg_gain * (period - 1) + g) / period;
        avg_loss = (avg_loss * (period - 1) + l) / period;
    }
    if (avg_loss == 0.0) return 100.0;
    double rs = avg_gain / avg_loss;
    return 100.0 - (100.0 / (1.0 + rs));
}

// ---------- MACD (12, 26, 9) ----------
struct MacdResult { double macd; double signal; std::string state; };

MacdResult macd(const vector<double>& v) {
    auto ema12 = ema_series(v, 12);
    auto ema26 = ema_series(v, 26);
    vector<double> macd_line(v.size());
    for (size_t i = 0; i < v.size(); ++i) macd_line[i] = ema12[i] - ema26[i];
    auto sig_line = ema_series(macd_line, 9);
    double m = macd_line.back();
    double s = sig_line.back();
    std::string state = "neutral";
    if (m > s * 1.005) state = "bullish";
    else if (m < s * 0.995) state = "bearish";
    return {m, s, state};
}

// ---------- MA50 trend ----------
std::string ma_trend(const vector<double>& v, size_t period = 50) {
    if (v.size() < period + 5) return "sideways";
    double now = sma(v, period);
    vector<double> earlier(v.begin(), v.end() - 5);
    double prev = sma(earlier, period);
    double diff_pct = (now - prev) / prev * 100.0;
    if (diff_pct > 0.5) return "up";
    if (diff_pct < -0.5) return "down";
    return "sideways";
}

int main() {
    // Baca CSV dari stdin
    std::string line;
    std::getline(std::cin, line);
    vector<double> prices;
    std::stringstream ss(line);
    std::string tok;
    while (std::getline(ss, tok, ',')) {
        try { prices.push_back(std::stod(tok)); } catch (...) {}
    }

    if (prices.size() < 30) {
        std::cerr << "butuh minimal 30 data point" << std::endl;
        return 1;
    }

    double r = rsi(prices, 14);
    auto m = macd(prices);
    double ma = sma(prices, 50);
    std::string trend = ma_trend(prices, 50);

    std::cout << std::fixed << std::setprecision(4);
    std::cout << "{"
              << "\"rsi\":" << r << ","
              << "\"macd\":" << m.macd << ","
              << "\"macd_signal_line\":" << m.signal << ","
              << "\"macd_signal\":\"" << m.state << "\","
              << "\"ma50\":" << ma << ","
              << "\"ma50_trend\":\"" << trend << "\","
              << "\"data_points\":" << prices.size()
              << "}" << std::endl;
    return 0;
}
