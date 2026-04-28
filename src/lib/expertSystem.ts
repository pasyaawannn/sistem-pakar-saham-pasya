// Database saham IDX (LQ45 + saham populer) — total 40 emiten
// Data sampel untuk demo sistem pakar (bukan harga real-time)

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  // Fundamental
  per: number;
  pbv: number;
  roe: number;        // %
  der: number;
  dividendYield: number; // %
  eps: number;        // earning per share
  netProfitGrowth: number; // YoY %
  // Teknikal (output modul C++)
  rsi: number;
  macdSignal: "bullish" | "bearish" | "neutral";
  ma50Trend: "up" | "down" | "sideways";
  volumeStrength: "high" | "normal" | "low";
  // Meta
  marketCap: number;  // triliun rupiah
  beta: number;       // volatilitas vs IHSG
}

export const SAMPLE_STOCKS: Stock[] = [
  // Perbankan
  { ticker: "BBCA", name: "Bank Central Asia", sector: "Perbankan", price: 9850, per: 22.4, pbv: 4.6, roe: 21.5, der: 0.18, dividendYield: 2.4, eps: 440, netProfitGrowth: 12.4, rsi: 58, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "high", marketCap: 1215, beta: 0.85 },
  { ticker: "BBRI", name: "Bank Rakyat Indonesia", sector: "Perbankan", price: 4720, per: 12.1, pbv: 2.3, roe: 19.8, der: 0.22, dividendYield: 6.1, eps: 390, netProfitGrowth: 8.2, rsi: 52, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "high", marketCap: 715, beta: 1.05 },
  { ticker: "BMRI", name: "Bank Mandiri", sector: "Perbankan", price: 6300, per: 11.5, pbv: 2.1, roe: 18.4, der: 0.24, dividendYield: 5.4, eps: 548, netProfitGrowth: 14.1, rsi: 61, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "high", marketCap: 588, beta: 1.10 },
  { ticker: "BBNI", name: "Bank Negara Indonesia", sector: "Perbankan", price: 4580, per: 9.2, pbv: 1.3, roe: 15.2, der: 0.31, dividendYield: 6.8, eps: 498, netProfitGrowth: 10.8, rsi: 47, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 171, beta: 1.20 },
  { ticker: "BRIS", name: "Bank Syariah Indonesia", sector: "Perbankan", price: 2680, per: 18.6, pbv: 2.8, roe: 16.4, der: 0.28, dividendYield: 1.8, eps: 144, netProfitGrowth: 22.5, rsi: 64, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 124, beta: 1.15 },
  { ticker: "BBTN", name: "Bank Tabungan Negara", sector: "Perbankan", price: 1265, per: 6.8, pbv: 0.6, roe: 9.2, der: 0.85, dividendYield: 3.2, eps: 186, netProfitGrowth: -4.5, rsi: 36, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "low", marketCap: 18, beta: 1.35 },

  // Telekomunikasi
  { ticker: "TLKM", name: "Telkom Indonesia", sector: "Telekomunikasi", price: 2780, per: 13.8, pbv: 2.4, roe: 16.2, der: 0.65, dividendYield: 5.8, eps: 201, netProfitGrowth: -2.1, rsi: 38, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "high", marketCap: 275, beta: 0.95 },
  { ticker: "ISAT", name: "Indosat Ooredoo Hutchison", sector: "Telekomunikasi", price: 2450, per: 14.5, pbv: 2.2, roe: 15.8, der: 1.45, dividendYield: 3.4, eps: 169, netProfitGrowth: 28.6, rsi: 56, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 80, beta: 1.10 },
  { ticker: "EXCL", name: "XL Axiata", sector: "Telekomunikasi", price: 2150, per: 19.2, pbv: 1.1, roe: 5.8, der: 1.62, dividendYield: 2.1, eps: 112, netProfitGrowth: 6.4, rsi: 49, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 28, beta: 1.05 },

  // Konsumen
  { ticker: "UNVR", name: "Unilever Indonesia", sector: "Konsumen", price: 2240, per: 25.6, pbv: 18.2, roe: 71.2, der: 1.85, dividendYield: 4.1, eps: 87, netProfitGrowth: -8.5, rsi: 32, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "normal", marketCap: 85, beta: 0.65 },
  { ticker: "ICBP", name: "Indofood CBP", sector: "Konsumen", price: 11250, per: 16.8, pbv: 3.2, roe: 19.4, der: 0.92, dividendYield: 2.8, eps: 670, netProfitGrowth: 11.5, rsi: 55, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 131, beta: 0.75 },
  { ticker: "INDF", name: "Indofood Sukses Makmur", sector: "Konsumen", price: 6750, per: 7.4, pbv: 1.0, roe: 14.2, der: 0.74, dividendYield: 4.6, eps: 912, netProfitGrowth: 8.8, rsi: 53, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 59, beta: 0.85 },
  { ticker: "GGRM", name: "Gudang Garam", sector: "Konsumen", price: 16800, per: 14.2, pbv: 0.8, roe: 5.8, der: 0.42, dividendYield: 5.2, eps: 1183, netProfitGrowth: -12.4, rsi: 41, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "low", marketCap: 32, beta: 0.70 },
  { ticker: "HMSP", name: "HM Sampoerna", sector: "Konsumen", price: 765, per: 11.2, pbv: 3.4, roe: 30.5, der: 0.18, dividendYield: 8.4, eps: 68, netProfitGrowth: -5.2, rsi: 42, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 89, beta: 0.60 },
  { ticker: "MYOR", name: "Mayora Indah", sector: "Konsumen", price: 2540, per: 17.4, pbv: 3.1, roe: 18.6, der: 0.48, dividendYield: 1.4, eps: 146, netProfitGrowth: 16.8, rsi: 60, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 57, beta: 0.95 },
  { ticker: "JPFA", name: "Japfa Comfeed", sector: "Konsumen", price: 1640, per: 8.6, pbv: 1.2, roe: 14.8, der: 0.92, dividendYield: 4.8, eps: 191, netProfitGrowth: 24.5, rsi: 62, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 19, beta: 1.10 },

  // Pertambangan
  { ticker: "ANTM", name: "Aneka Tambang", sector: "Pertambangan", price: 1565, per: 11.4, pbv: 1.6, roe: 14.8, der: 0.36, dividendYield: 3.4, eps: 137, netProfitGrowth: 18.6, rsi: 67, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "high", marketCap: 38, beta: 1.45 },
  { ticker: "PTBA", name: "Bukit Asam", sector: "Pertambangan", price: 2680, per: 4.8, pbv: 1.4, roe: 30.2, der: 0.15, dividendYield: 12.5, eps: 558, netProfitGrowth: -22.4, rsi: 48, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 31, beta: 1.25 },
  { ticker: "ADRO", name: "Adaro Energy", sector: "Pertambangan", price: 2580, per: 4.2, pbv: 1.1, roe: 26.8, der: 0.42, dividendYield: 11.2, eps: 614, netProfitGrowth: -30.5, rsi: 44, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "high", marketCap: 82, beta: 1.40 },
  { ticker: "ITMG", name: "Indo Tambangraya Megah", sector: "Pertambangan", price: 26500, per: 3.8, pbv: 1.2, roe: 32.5, der: 0.12, dividendYield: 18.4, eps: 6974, netProfitGrowth: -28.2, rsi: 46, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 30, beta: 1.30 },
  { ticker: "MDKA", name: "Merdeka Copper Gold", sector: "Pertambangan", price: 2380, per: 32.4, pbv: 4.2, roe: 13.8, der: 1.25, dividendYield: 0, eps: 73, netProfitGrowth: 42.5, rsi: 71, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "high", marketCap: 58, beta: 1.55 },
  { ticker: "INCO", name: "Vale Indonesia", sector: "Pertambangan", price: 3420, per: 18.6, pbv: 1.5, roe: 8.2, der: 0.18, dividendYield: 2.4, eps: 184, netProfitGrowth: -45.6, rsi: 35, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "normal", marketCap: 34, beta: 1.50 },

  // Energi
  { ticker: "MEDC", name: "Medco Energi", sector: "Energi", price: 1185, per: 6.4, pbv: 1.0, roe: 16.4, der: 1.85, dividendYield: 3.2, eps: 185, netProfitGrowth: -18.4, rsi: 41, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 30, beta: 1.40 },
  { ticker: "PGAS", name: "Perusahaan Gas Negara", sector: "Energi", price: 1605, per: 8.4, pbv: 0.9, roe: 11.2, der: 0.82, dividendYield: 7.4, eps: 191, netProfitGrowth: 5.6, rsi: 51, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 39, beta: 1.05 },

  // Otomotif & Industri
  { ticker: "ASII", name: "Astra International", sector: "Aneka Industri", price: 5025, per: 8.2, pbv: 1.1, roe: 14.5, der: 0.78, dividendYield: 7.2, eps: 613, netProfitGrowth: -4.2, rsi: 44, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "high", marketCap: 203, beta: 1.05 },
  { ticker: "UNTR", name: "United Tractors", sector: "Aneka Industri", price: 26800, per: 5.4, pbv: 1.2, roe: 23.4, der: 0.32, dividendYield: 12.8, eps: 4963, netProfitGrowth: -16.8, rsi: 50, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 100, beta: 1.20 },

  // Properti & Konstruksi
  { ticker: "BSDE", name: "Bumi Serpong Damai", sector: "Properti", price: 1085, per: 7.2, pbv: 0.6, roe: 8.4, der: 0.52, dividendYield: 1.8, eps: 151, netProfitGrowth: 12.4, rsi: 54, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 23, beta: 1.25 },
  { ticker: "PWON", name: "Pakuwon Jati", sector: "Properti", price: 408, per: 8.6, pbv: 1.0, roe: 12.5, der: 0.38, dividendYield: 2.6, eps: 47, netProfitGrowth: 8.2, rsi: 49, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 20, beta: 1.30 },
  { ticker: "CTRA", name: "Ciputra Development", sector: "Properti", price: 1130, per: 11.4, pbv: 1.0, roe: 9.5, der: 0.62, dividendYield: 1.5, eps: 99, netProfitGrowth: 4.2, rsi: 46, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "low", marketCap: 21, beta: 1.20 },
  { ticker: "WIKA", name: "Wijaya Karya", sector: "Konstruksi", price: 312, per: 0, pbv: 0.4, roe: -18.5, der: 3.85, dividendYield: 0, eps: -185, netProfitGrowth: -120.5, rsi: 28, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "low", marketCap: 3, beta: 1.65 },
  { ticker: "PTPP", name: "PP (Persero)", sector: "Konstruksi", price: 384, per: 14.8, pbv: 0.3, roe: 2.1, der: 2.45, dividendYield: 0, eps: 26, netProfitGrowth: -35.4, rsi: 32, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "low", marketCap: 2, beta: 1.55 },

  // Kesehatan
  { ticker: "KLBF", name: "Kalbe Farma", sector: "Kesehatan", price: 1620, per: 22.1, pbv: 3.5, roe: 16.8, der: 0.21, dividendYield: 2.2, eps: 73, netProfitGrowth: 6.4, rsi: 46, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 76, beta: 0.80 },
  { ticker: "MIKA", name: "Mitra Keluarga Karyasehat", sector: "Kesehatan", price: 2780, per: 28.6, pbv: 5.4, roe: 19.8, der: 0.05, dividendYield: 2.4, eps: 97, netProfitGrowth: 14.5, rsi: 58, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 41, beta: 0.70 },

  // Teknologi & Digital
  { ticker: "GOTO", name: "GoTo Gojek Tokopedia", sector: "Teknologi", price: 65, per: 0, pbv: 1.4, roe: -22.5, der: 0.18, dividendYield: 0, eps: -22, netProfitGrowth: 35.4, rsi: 38, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "high", marketCap: 78, beta: 1.85 },
  { ticker: "BUKA", name: "Bukalapak", sector: "Teknologi", price: 118, per: 0, pbv: 0.5, roe: -8.4, der: 0.12, dividendYield: 0, eps: -12, netProfitGrowth: 58.2, rsi: 42, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 12, beta: 1.70 },
  { ticker: "EMTK", name: "Elang Mahkota Teknologi", sector: "Teknologi", price: 545, per: 18.4, pbv: 0.8, roe: 4.2, der: 0.28, dividendYield: 1.2, eps: 30, netProfitGrowth: -12.4, rsi: 40, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "low", marketCap: 32, beta: 1.35 },

  // Infrastruktur
  { ticker: "JSMR", name: "Jasa Marga", sector: "Infrastruktur", price: 4920, per: 9.4, pbv: 1.1, roe: 12.4, der: 1.85, dividendYield: 3.8, eps: 523, netProfitGrowth: 18.5, rsi: 56, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 36, beta: 1.10 },
  { ticker: "SMGR", name: "Semen Indonesia", sector: "Industri Dasar", price: 3650, per: 13.6, pbv: 0.7, roe: 5.4, der: 0.62, dividendYield: 4.5, eps: 268, netProfitGrowth: -22.4, rsi: 39, macdSignal: "bearish", ma50Trend: "down", volumeStrength: "normal", marketCap: 24, beta: 1.15 },
  { ticker: "INTP", name: "Indocement Tunggal Prakarsa", sector: "Industri Dasar", price: 6800, per: 14.2, pbv: 1.4, roe: 9.8, der: 0.18, dividendYield: 4.2, eps: 479, netProfitGrowth: -8.4, rsi: 43, macdSignal: "neutral", ma50Trend: "sideways", volumeStrength: "normal", marketCap: 25, beta: 1.05 },

  // Konglomerasi & Lainnya
  { ticker: "SIDO", name: "Sido Muncul", sector: "Kesehatan", price: 615, per: 14.8, pbv: 5.6, roe: 38.4, der: 0.04, dividendYield: 6.8, eps: 42, netProfitGrowth: 11.2, rsi: 54, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 18, beta: 0.65 },
  { ticker: "AKRA", name: "AKR Corporindo", sector: "Energi", price: 1485, per: 11.2, pbv: 2.4, roe: 21.8, der: 0.22, dividendYield: 5.4, eps: 132, netProfitGrowth: 14.6, rsi: 57, macdSignal: "bullish", ma50Trend: "up", volumeStrength: "normal", marketCap: 30, beta: 0.95 },
];

export const SECTORS = Array.from(new Set(SAMPLE_STOCKS.map((s) => s.sector))).sort();

// =====================================================================
// EXPERT SYSTEM — Rule-Based + Forward Chaining + Certainty Factor (CF)
// =====================================================================

export type RiskProfile = "konservatif" | "moderat" | "agresif";
export type InvestmentGoal = "dividen" | "growth" | "value" | "trading";
export type RuleCategory = "Fundamental" | "Teknikal" | "Tujuan" | "Risiko" | "Filter";

export interface Rule {
  id: string;
  category: RuleCategory;
  premise: string;        // IF
  conclusion: string;     // THEN
  weight: number;         // skor (+/-)
  cf: number;             // certainty factor 0..1
}

/** KNOWLEDGE BASE — semua aturan eksplisit, mudah diaudit dosen. */
export const KNOWLEDGE_BASE: Rule[] = [
  // FUNDAMENTAL
  { id: "R01", category: "Fundamental", premise: "PER < 10",                    conclusion: "Saham undervalued",            weight: +14, cf: 0.85 },
  { id: "R02", category: "Fundamental", premise: "10 ≤ PER < 15",               conclusion: "Valuasi wajar",                 weight: +6,  cf: 0.70 },
  { id: "R03", category: "Fundamental", premise: "PER > 25",                    conclusion: "Saham overvalued",             weight: -10, cf: 0.80 },
  { id: "R04", category: "Fundamental", premise: "PBV < 1",                     conclusion: "Harga di bawah nilai buku",     weight: +12, cf: 0.85 },
  { id: "R05", category: "Fundamental", premise: "PBV > 5",                     conclusion: "Premium tinggi atas nilai buku", weight: -7,  cf: 0.75 },
  { id: "R06", category: "Fundamental", premise: "ROE > 20%",                   conclusion: "Manajemen sangat efisien",      weight: +14, cf: 0.90 },
  { id: "R07", category: "Fundamental", premise: "15% < ROE ≤ 20%",             conclusion: "Profitabilitas baik",           weight: +8,  cf: 0.80 },
  { id: "R08", category: "Fundamental", premise: "ROE < 10%",                   conclusion: "Profitabilitas lemah",         weight: -8,  cf: 0.80 },
  { id: "R09", category: "Fundamental", premise: "ROE negatif",                 conclusion: "Perusahaan rugi",              weight: -20, cf: 0.95 },
  { id: "R10", category: "Fundamental", premise: "DER < 0.5",                   conclusion: "Struktur modal sehat",         weight: +7,  cf: 0.80 },
  { id: "R11", category: "Fundamental", premise: "DER > 1.5",                   conclusion: "Beban utang tinggi",           weight: -10, cf: 0.85 },
  { id: "R12", category: "Fundamental", premise: "Net profit growth > 20%",    conclusion: "Pertumbuhan laba kuat",         weight: +10, cf: 0.85 },
  { id: "R13", category: "Fundamental", premise: "Net profit growth < -10%",   conclusion: "Laba turun signifikan",         weight: -10, cf: 0.85 },

  // TEKNIKAL (dihitung modul C++)
  { id: "R14", category: "Teknikal",   premise: "RSI < 30 (oversold)",         conclusion: "Potensi rebound jangka pendek", weight: +10, cf: 0.75 },
  { id: "R15", category: "Teknikal",   premise: "RSI > 70 (overbought)",       conclusion: "Risiko koreksi tinggi",         weight: -10, cf: 0.75 },
  { id: "R16", category: "Teknikal",   premise: "MACD bullish crossover",       conclusion: "Momentum naik",                weight: +9,  cf: 0.70 },
  { id: "R17", category: "Teknikal",   premise: "MACD bearish crossover",       conclusion: "Momentum turun",               weight: -9,  cf: 0.70 },
  { id: "R18", category: "Teknikal",   premise: "MA50 trend up",                conclusion: "Tren jangka menengah naik",      weight: +6,  cf: 0.75 },
  { id: "R19", category: "Teknikal",   premise: "MA50 trend down",              conclusion: "Tren jangka menengah turun",     weight: -6,  cf: 0.75 },
  { id: "R20", category: "Teknikal",   premise: "Volume strength = high",       conclusion: "Konfirmasi minat pasar tinggi",  weight: +4,  cf: 0.65 },
  { id: "R21", category: "Teknikal",   premise: "Volume strength = low",        conclusion: "Likuiditas rendah",            weight: -4,  cf: 0.65 },

  // TUJUAN INVESTASI
  { id: "R22", category: "Tujuan",     premise: "Goal=Dividen ∧ Yield ≥ 5%",    conclusion: "Cocok untuk passive income",    weight: +12, cf: 0.90 },
  { id: "R23", category: "Tujuan",     premise: "Goal=Value ∧ PER<12 ∧ PBV<2",  conclusion: "Memenuhi value investing",      weight: +12, cf: 0.85 },
  { id: "R24", category: "Tujuan",     premise: "Goal=Growth ∧ ROE>18 ∧ Growth>15%", conclusion: "Memenuhi growth investing", weight: +12, cf: 0.85 },
  { id: "R25", category: "Tujuan",     premise: "Goal=Trading ∧ MACD bullish ∧ RSI<65", conclusion: "Setup trading bagus",     weight: +10, cf: 0.75 },

  // PROFIL RISIKO
  { id: "R26", category: "Risiko",     premise: "Risiko=Konservatif ∧ MarketCap≥100T", conclusion: "Big cap aman",            weight: +7,  cf: 0.85 },
  { id: "R27", category: "Risiko",     premise: "Risiko=Konservatif ∧ MarketCap<100T", conclusion: "Terlalu kecil bagi konservatif", weight: -7, cf: 0.80 },
  { id: "R28", category: "Risiko",     premise: "Risiko=Konservatif ∧ DER>1",          conclusion: "Risiko utang tinggi",     weight: -10, cf: 0.85 },
  { id: "R29", category: "Risiko",     premise: "Risiko=Konservatif ∧ Beta<0.9",       conclusion: "Volatilitas rendah",       weight: +5,  cf: 0.75 },
  { id: "R30", category: "Risiko",     premise: "Risiko=Agresif ∧ Beta>1.3",           conclusion: "Sesuai profil agresif",    weight: +6,  cf: 0.75 },
  { id: "R31", category: "Risiko",     premise: "Risiko=Agresif ∧ MACD bullish ∧ RSI 40-65", conclusion: "Momentum kuat",      weight: +5,  cf: 0.75 },

  // FILTER PENGGUNA
  { id: "R32", category: "Filter",     premise: "Yield < target user",          conclusion: "Tidak penuhi target dividen",   weight: -15, cf: 0.95 },
  { id: "R33", category: "Filter",     premise: "PER > batas user",             conclusion: "Melebihi batas valuasi",         weight: -12, cf: 0.95 },
];

export interface FiredRule {
  rule: Rule;
  contribution: number; // weight * cf, signed
}

export interface Recommendation {
  stock: Stock;
  score: number;        // 0-100
  confidence: number;   // 0-100, gabungan CF
  verdict: "STRONG BUY" | "BUY" | "HOLD" | "SELL" | "STRONG SELL";
  timeHorizon: "Trading (1-4 minggu)" | "Jangka Pendek (1-3 bulan)" | "Jangka Menengah (3-12 bulan)" | "Jangka Panjang (>1 tahun)";
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  potentialReturn: number; // %
  reasons: string[];
  firedRules: FiredRule[];
  trace: string[]; // step-by-step forward chaining
}

interface InferenceInput {
  risk: RiskProfile;
  goal: InvestmentGoal;
  minDividend?: number;
  maxPER?: number;
  sectors?: string[];
}

function fire(out: FiredRule[], trace: string[], rule: Rule, factText: string) {
  const contribution = rule.weight * rule.cf;
  out.push({ rule, contribution });
  const sign = contribution >= 0 ? "+" : "";
  trace.push(`[${rule.id}] ${factText} ⇒ ${rule.conclusion} (${sign}${contribution.toFixed(2)} | CF=${rule.cf})`);
}

function getRule(id: string): Rule {
  return KNOWLEDGE_BASE.find((r) => r.id === id)!;
}

/**
 * FORWARD CHAINING ENGINE
 * Iterasi melalui working memory (fakta saham + input user),
 * lalu mencocokkan setiap rule pada knowledge base.
 */
export function runExpertSystem(input: InferenceInput): Recommendation[] {
  const stocks = input.sectors && input.sectors.length > 0
    ? SAMPLE_STOCKS.filter((s) => input.sectors!.includes(s.sector))
    : SAMPLE_STOCKS;

  const results: Recommendation[] = stocks.map((s) => {
    const fired: FiredRule[] = [];
    const trace: string[] = [];
    const reasons: string[] = [];
    let score = 50;

    trace.push(`▶ Memulai inferensi untuk ${s.ticker} (${s.name})`);
    trace.push(`  Working memory: PER=${s.per}, PBV=${s.pbv}, ROE=${s.roe}%, DER=${s.der}, Yield=${s.dividendYield}%, RSI=${s.rsi}, MACD=${s.macdSignal}`);

    // === FUNDAMENTAL ===
    if (s.per > 0 && s.per < 10) { fire(fired, trace, getRule("R01"), `PER=${s.per} < 10`); reasons.push(`PER ${s.per} sangat menarik (undervalued).`); }
    else if (s.per > 0 && s.per < 15) fire(fired, trace, getRule("R02"), `PER=${s.per} di rentang wajar`);
    else if (s.per > 25) { fire(fired, trace, getRule("R03"), `PER=${s.per} > 25`); reasons.push(`PER ${s.per} tergolong tinggi.`); }

    if (s.pbv < 1) { fire(fired, trace, getRule("R04"), `PBV=${s.pbv} < 1`); reasons.push(`PBV ${s.pbv} di bawah nilai buku.`); }
    else if (s.pbv > 5) fire(fired, trace, getRule("R05"), `PBV=${s.pbv} > 5`);

    if (s.roe < 0) { fire(fired, trace, getRule("R09"), `ROE=${s.roe}% (negatif)`); reasons.push(`Perusahaan masih rugi (ROE negatif).`); }
    else if (s.roe > 20) { fire(fired, trace, getRule("R06"), `ROE=${s.roe}% > 20%`); reasons.push(`ROE ${s.roe}% sangat tinggi.`); }
    else if (s.roe > 15) fire(fired, trace, getRule("R07"), `ROE=${s.roe}% di 15-20%`);
    else if (s.roe < 10) fire(fired, trace, getRule("R08"), `ROE=${s.roe}% < 10%`);

    if (s.der < 0.5) fire(fired, trace, getRule("R10"), `DER=${s.der} < 0.5`);
    else if (s.der > 1.5) { fire(fired, trace, getRule("R11"), `DER=${s.der} > 1.5`); reasons.push(`DER ${s.der} tinggi (utang besar).`); }

    if (s.netProfitGrowth > 20) { fire(fired, trace, getRule("R12"), `Pertumbuhan laba ${s.netProfitGrowth}%`); reasons.push(`Laba tumbuh ${s.netProfitGrowth}% YoY.`); }
    else if (s.netProfitGrowth < -10) { fire(fired, trace, getRule("R13"), `Pertumbuhan laba ${s.netProfitGrowth}%`); reasons.push(`Laba turun ${s.netProfitGrowth}% YoY.`); }

    // === TEKNIKAL (sumber: modul C++) ===
    if (s.rsi < 30) { fire(fired, trace, getRule("R14"), `RSI=${s.rsi} oversold`); reasons.push(`RSI ${s.rsi} oversold — potensi rebound.`); }
    else if (s.rsi > 70) { fire(fired, trace, getRule("R15"), `RSI=${s.rsi} overbought`); reasons.push(`RSI ${s.rsi} overbought — risiko koreksi.`); }

    if (s.macdSignal === "bullish") fire(fired, trace, getRule("R16"), "MACD bullish");
    else if (s.macdSignal === "bearish") fire(fired, trace, getRule("R17"), "MACD bearish");

    if (s.ma50Trend === "up") fire(fired, trace, getRule("R18"), "MA50 uptrend");
    else if (s.ma50Trend === "down") fire(fired, trace, getRule("R19"), "MA50 downtrend");

    if (s.volumeStrength === "high") fire(fired, trace, getRule("R20"), "Volume tinggi");
    else if (s.volumeStrength === "low") fire(fired, trace, getRule("R21"), "Volume rendah");

    // === GOAL ===
    if (input.goal === "dividen" && s.dividendYield >= 5) { fire(fired, trace, getRule("R22"), `Goal dividen & yield ${s.dividendYield}%`); reasons.push(`Dividend yield ${s.dividendYield}% cocok untuk income.`); }
    if (input.goal === "value" && s.per > 0 && s.per < 12 && s.pbv < 2) { fire(fired, trace, getRule("R23"), "Memenuhi PER<12 & PBV<2"); reasons.push("Memenuhi kriteria value investing klasik."); }
    if (input.goal === "growth" && s.roe > 18 && s.netProfitGrowth > 15) { fire(fired, trace, getRule("R24"), `ROE ${s.roe}% & growth ${s.netProfitGrowth}%`); reasons.push("Pertumbuhan laba & ROE memenuhi growth investing."); }
    if (input.goal === "trading" && s.macdSignal === "bullish" && s.rsi < 65) { fire(fired, trace, getRule("R25"), "MACD bullish & RSI<65"); reasons.push("Setup teknikal bagus untuk trading."); }

    // === RISK ===
    if (input.risk === "konservatif") {
      if (s.marketCap >= 100) fire(fired, trace, getRule("R26"), `MarketCap ${s.marketCap}T`);
      else fire(fired, trace, getRule("R27"), `MarketCap ${s.marketCap}T < 100T`);
      if (s.der > 1) fire(fired, trace, getRule("R28"), `DER ${s.der} > 1`);
      if (s.beta < 0.9) fire(fired, trace, getRule("R29"), `Beta ${s.beta} rendah`);
    } else if (input.risk === "agresif") {
      if (s.beta > 1.3) fire(fired, trace, getRule("R30"), `Beta ${s.beta} > 1.3`);
      if (s.macdSignal === "bullish" && s.rsi >= 40 && s.rsi <= 65) fire(fired, trace, getRule("R31"), "Momentum bullish");
    }

    // === USER FILTER ===
    if (input.minDividend && s.dividendYield < input.minDividend) { fire(fired, trace, getRule("R32"), `Yield ${s.dividendYield}% < ${input.minDividend}%`); reasons.push(`Dividend yield di bawah target ${input.minDividend}%.`); }
    if (input.maxPER && s.per > input.maxPER) fire(fired, trace, getRule("R33"), `PER ${s.per} > ${input.maxPER}`);

    // === AGREGASI SKOR ===
    const totalContribution = fired.reduce((sum, f) => sum + f.contribution, 0);
    score = Math.max(0, Math.min(100, Math.round(50 + totalContribution)));

    // Confidence = rata-rata CF dari rule yang fire
    const confidence = fired.length === 0
      ? 50
      : Math.round((fired.reduce((sum, f) => sum + f.rule.cf, 0) / fired.length) * 100);

    // === VERDICT ===
    let verdict: Recommendation["verdict"];
    if (score >= 80) verdict = "STRONG BUY";
    else if (score >= 65) verdict = "BUY";
    else if (score >= 45) verdict = "HOLD";
    else if (score >= 30) verdict = "SELL";
    else verdict = "STRONG SELL";

    // === TIME HORIZON ===
    let timeHorizon: Recommendation["timeHorizon"];
    if (input.goal === "trading") timeHorizon = "Trading (1-4 minggu)";
    else if (input.goal === "value") timeHorizon = "Jangka Panjang (>1 tahun)";
    else if (input.goal === "dividen") timeHorizon = "Jangka Menengah (3-12 bulan)";
    else timeHorizon = "Jangka Pendek (1-3 bulan)";

    // === PRICE TARGETS ===
    const upsidePct = (score - 50) / 100; // -0.5 .. +0.5
    const targetPrice = Math.round(s.price * (1 + Math.max(0.03, upsidePct * 0.4)));
    const stopLoss = Math.round(s.price * (1 - 0.07));
    const potentialReturn = Math.round(((targetPrice - s.price) / s.price) * 100 * 10) / 10;

    if (reasons.length === 0) reasons.push("Profil saham relatif netral terhadap kriteria Anda.");
    trace.push(`◆ Total kontribusi: ${totalContribution.toFixed(2)} → Skor akhir: ${score}/100 → ${verdict}`);

    return {
      stock: s,
      score,
      confidence,
      verdict,
      timeHorizon,
      entryPrice: s.price,
      targetPrice,
      stopLoss,
      potentialReturn,
      reasons,
      firedRules: fired,
      trace,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
