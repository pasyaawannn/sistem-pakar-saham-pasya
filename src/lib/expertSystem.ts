// Sample data saham IDX (untuk demo sistem pakar)
// Bisa diganti dengan call ke FastAPI backend nanti

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  // Fundamental
  per: number; // Price to Earnings Ratio
  pbv: number; // Price to Book Value
  roe: number; // Return on Equity (%)
  der: number; // Debt to Equity Ratio
  dividendYield: number; // %
  // Teknikal (akan dihitung modul C++ di backend nyata)
  rsi: number; // 0-100
  macdSignal: "bullish" | "bearish" | "neutral";
  ma50Trend: "up" | "down" | "sideways";
  // Meta
  marketCap: number; // dalam triliun
}

export const SAMPLE_STOCKS: Stock[] = [
  { ticker: "BBCA", name: "Bank Central Asia", sector: "Perbankan", price: 9850, per: 22.4, pbv: 4.6, roe: 21.5, der: 0.18, dividendYield: 2.4, rsi: 58, macdSignal: "bullish", ma50Trend: "up", marketCap: 1215 },
  { ticker: "BBRI", name: "Bank Rakyat Indonesia", sector: "Perbankan", price: 4720, per: 12.1, pbv: 2.3, roe: 19.8, der: 0.22, dividendYield: 6.1, rsi: 52, macdSignal: "neutral", ma50Trend: "sideways", marketCap: 715 },
  { ticker: "BMRI", name: "Bank Mandiri", sector: "Perbankan", price: 6300, per: 11.5, pbv: 2.1, roe: 18.4, der: 0.24, dividendYield: 5.4, rsi: 61, macdSignal: "bullish", ma50Trend: "up", marketCap: 588 },
  { ticker: "TLKM", name: "Telkom Indonesia", sector: "Telekomunikasi", price: 2780, per: 13.8, pbv: 2.4, roe: 16.2, der: 0.65, dividendYield: 5.8, rsi: 38, macdSignal: "bearish", ma50Trend: "down", marketCap: 275 },
  { ticker: "ASII", name: "Astra International", sector: "Aneka Industri", price: 5025, per: 8.2, pbv: 1.1, roe: 14.5, der: 0.78, dividendYield: 7.2, rsi: 44, macdSignal: "neutral", ma50Trend: "sideways", marketCap: 203 },
  { ticker: "UNVR", name: "Unilever Indonesia", sector: "Konsumen", price: 2240, per: 25.6, pbv: 18.2, roe: 71.2, der: 1.85, dividendYield: 4.1, rsi: 32, macdSignal: "bearish", ma50Trend: "down", marketCap: 85 },
  { ticker: "ICBP", name: "Indofood CBP", sector: "Konsumen", price: 11250, per: 16.8, pbv: 3.2, roe: 19.4, der: 0.92, dividendYield: 2.8, rsi: 55, macdSignal: "bullish", ma50Trend: "up", marketCap: 131 },
  { ticker: "GGRM", name: "Gudang Garam", sector: "Konsumen", price: 16800, per: 14.2, pbv: 0.8, roe: 5.8, der: 0.42, dividendYield: 5.2, rsi: 41, macdSignal: "neutral", ma50Trend: "sideways", marketCap: 32 },
  { ticker: "ANTM", name: "Aneka Tambang", sector: "Pertambangan", price: 1565, per: 11.4, pbv: 1.6, roe: 14.8, der: 0.36, dividendYield: 3.4, rsi: 67, macdSignal: "bullish", ma50Trend: "up", marketCap: 38 },
  { ticker: "PTBA", name: "Bukit Asam", sector: "Pertambangan", price: 2680, per: 4.8, pbv: 1.4, roe: 30.2, der: 0.15, dividendYield: 12.5, rsi: 48, macdSignal: "neutral", ma50Trend: "sideways", marketCap: 31 },
  { ticker: "INDF", name: "Indofood Sukses Makmur", sector: "Konsumen", price: 6750, per: 7.4, pbv: 1.0, roe: 14.2, der: 0.74, dividendYield: 4.6, rsi: 53, macdSignal: "bullish", ma50Trend: "up", marketCap: 59 },
  { ticker: "KLBF", name: "Kalbe Farma", sector: "Kesehatan", price: 1620, per: 22.1, pbv: 3.5, roe: 16.8, der: 0.21, dividendYield: 2.2, rsi: 46, macdSignal: "neutral", ma50Trend: "sideways", marketCap: 76 },
];

export type RiskProfile = "konservatif" | "moderat" | "agresif";
export type InvestmentGoal = "dividen" | "growth" | "value" | "trading";

export interface Recommendation {
  stock: Stock;
  score: number; // 0-100
  verdict: "STRONG BUY" | "BUY" | "HOLD" | "SELL";
  reasons: string[];
  rulesFired: string[];
}

interface InferenceInput {
  risk: RiskProfile;
  goal: InvestmentGoal;
  minDividend?: number;
  maxPER?: number;
  sectors?: string[];
}

/**
 * Forward-chaining rule engine + scoring.
 * Mirror dari logic Python backend (expert_engine.py).
 * Setiap rule yang fire menambah/mengurangi skor & menjelaskan keputusan.
 */
export function runExpertSystem(input: InferenceInput): Recommendation[] {
  const filtered = input.sectors && input.sectors.length > 0
    ? SAMPLE_STOCKS.filter((s) => input.sectors!.includes(s.sector))
    : SAMPLE_STOCKS;

  const results: Recommendation[] = filtered.map((stock) => {
    let score = 50;
    const reasons: string[] = [];
    const rulesFired: string[] = [];

    // === FUNDAMENTAL RULES ===
    if (stock.per > 0 && stock.per < 10) {
      score += 12;
      reasons.push(`PER ${stock.per} sangat menarik (undervalued).`);
      rulesFired.push("R01: PER < 10 → +12");
    } else if (stock.per < 15) {
      score += 6;
      rulesFired.push("R02: PER < 15 → +6");
    } else if (stock.per > 25) {
      score -= 8;
      reasons.push(`PER ${stock.per} tinggi (overvalued).`);
      rulesFired.push("R03: PER > 25 → -8");
    }

    if (stock.pbv < 1) {
      score += 10;
      reasons.push(`PBV ${stock.pbv} < 1, harga di bawah nilai buku.`);
      rulesFired.push("R04: PBV < 1 → +10");
    } else if (stock.pbv > 5) {
      score -= 6;
      rulesFired.push("R05: PBV > 5 → -6");
    }

    if (stock.roe > 20) {
      score += 12;
      reasons.push(`ROE ${stock.roe}% sangat tinggi (manajemen efisien).`);
      rulesFired.push("R06: ROE > 20% → +12");
    } else if (stock.roe > 15) {
      score += 7;
      rulesFired.push("R07: ROE > 15% → +7");
    } else if (stock.roe < 10) {
      score -= 5;
      rulesFired.push("R08: ROE < 10% → -5");
    }

    if (stock.der < 0.5) {
      score += 6;
      rulesFired.push("R09: DER rendah → +6");
    } else if (stock.der > 1.5) {
      score -= 8;
      reasons.push(`DER ${stock.der} tinggi (utang besar).`);
      rulesFired.push("R10: DER > 1.5 → -8");
    }

    // === TEKNIKAL RULES (output simulasi modul C++) ===
    if (stock.rsi < 30) {
      score += 10;
      reasons.push(`RSI ${stock.rsi} oversold → potensi rebound.`);
      rulesFired.push("R11: RSI < 30 → +10");
    } else if (stock.rsi > 70) {
      score -= 10;
      reasons.push(`RSI ${stock.rsi} overbought → risiko koreksi.`);
      rulesFired.push("R12: RSI > 70 → -10");
    }

    if (stock.macdSignal === "bullish") {
      score += 8;
      rulesFired.push("R13: MACD bullish → +8");
    } else if (stock.macdSignal === "bearish") {
      score -= 8;
      rulesFired.push("R14: MACD bearish → -8");
    }

    if (stock.ma50Trend === "up") {
      score += 5;
      rulesFired.push("R15: MA50 uptrend → +5");
    } else if (stock.ma50Trend === "down") {
      score -= 5;
      rulesFired.push("R16: MA50 downtrend → -5");
    }

    // === GOAL-BASED RULES ===
    if (input.goal === "dividen" && stock.dividendYield >= 5) {
      score += 12;
      reasons.push(`Dividend yield ${stock.dividendYield}% cocok untuk income.`);
      rulesFired.push("R17: Goal dividen & yield ≥5% → +12");
    }
    if (input.goal === "value" && stock.per < 12 && stock.pbv < 2) {
      score += 10;
      reasons.push(`Memenuhi kriteria value investing klasik.`);
      rulesFired.push("R18: Goal value & PER<12 & PBV<2 → +10");
    }
    if (input.goal === "growth" && stock.roe > 18) {
      score += 8;
      rulesFired.push("R19: Goal growth & ROE>18 → +8");
    }
    if (input.goal === "trading" && stock.macdSignal === "bullish" && stock.rsi < 65) {
      score += 10;
      reasons.push(`Setup teknikal bagus untuk trading jangka pendek.`);
      rulesFired.push("R20: Goal trading & MACD bullish & RSI<65 → +10");
    }

    // === RISK PROFILE RULES ===
    if (input.risk === "konservatif") {
      if (stock.marketCap >= 100) {
        score += 6;
        rulesFired.push("R21: Konservatif & big cap → +6");
      } else {
        score -= 6;
        rulesFired.push("R22: Konservatif & small cap → -6");
      }
      if (stock.der > 1) {
        score -= 8;
        rulesFired.push("R23: Konservatif & DER>1 → -8");
      }
    } else if (input.risk === "agresif") {
      if (stock.rsi < 40 || stock.rsi > 60) {
        score += 4;
        rulesFired.push("R24: Agresif & momentum kuat → +4");
      }
    }

    // === USER FILTER RULES ===
    if (input.minDividend && stock.dividendYield < input.minDividend) {
      score -= 15;
      reasons.push(`Dividend yield di bawah target ${input.minDividend}%.`);
      rulesFired.push("R25: Yield < target → -15");
    }
    if (input.maxPER && stock.per > input.maxPER) {
      score -= 10;
      rulesFired.push("R26: PER > target → -10");
    }

    // Clamp
    score = Math.max(0, Math.min(100, Math.round(score)));

    let verdict: Recommendation["verdict"];
    if (score >= 80) verdict = "STRONG BUY";
    else if (score >= 65) verdict = "BUY";
    else if (score >= 45) verdict = "HOLD";
    else verdict = "SELL";

    if (reasons.length === 0) {
      reasons.push("Profil saham relatif netral terhadap kriteria Anda.");
    }

    return { stock, score, verdict, reasons, rulesFired };
  });

  return results.sort((a, b) => b.score - a.score);
}

export const SECTORS = Array.from(new Set(SAMPLE_STOCKS.map((s) => s.sector)));
