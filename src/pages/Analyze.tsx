import { useState } from "react";
import { Brain, Loader2, CheckCircle2, AlertTriangle, Cpu, TrendingUp, Target, ShieldAlert, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { runExpertSystem, SECTORS, type Recommendation, type RiskProfile, type InvestmentGoal } from "@/lib/expertSystem";

const verdictColor: Record<string, string> = {
  "STRONG BUY": "bg-success/20 text-success border-success/40",
  "BUY": "bg-primary/20 text-primary border-primary/40",
  "HOLD": "bg-warning/20 text-warning border-warning/40",
  "SELL": "bg-destructive/20 text-destructive border-destructive/40",
  "STRONG SELL": "bg-destructive/30 text-destructive border-destructive/60",
};

const Analyze = () => {
  const [risk, setRisk] = useState<RiskProfile>("moderat");
  const [goal, setGoal] = useState<InvestmentGoal>("value");
  const [minDividend, setMinDividend] = useState<string>("");
  const [maxPER, setMaxPER] = useState<string>("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [topOnly, setTopOnly] = useState(true);

  const toggleSector = (s: string) =>
    setSelectedSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const run = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setResults(runExpertSystem({
      risk, goal,
      minDividend: minDividend ? Number(minDividend) : undefined,
      maxPER: maxPER ? Number(maxPER) : undefined,
      sectors: selectedSectors,
    }));
    setLoading(false);
  };

  const visible = results ? (topOnly ? results.slice(0, 10) : results) : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Brain className="h-8 w-8 text-primary" /> Mesin Inferensi
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Forward chaining + Certainty Factor terhadap 33 rule pada knowledge base.
        </p>
      </div>

      {/* Form */}
      <Card className="glass border-primary/20 p-6 md:p-8 shadow-card">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label>Profil Risiko</Label>
            <Select value={risk} onValueChange={(v) => setRisk(v as RiskProfile)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="konservatif">Konservatif — utamakan keamanan</SelectItem>
                <SelectItem value="moderat">Moderat — seimbang</SelectItem>
                <SelectItem value="agresif">Agresif — cari momentum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tujuan Investasi</Label>
            <Select value={goal} onValueChange={(v) => setGoal(v as InvestmentGoal)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dividen">Dividen — passive income</SelectItem>
                <SelectItem value="value">Value — beli murah</SelectItem>
                <SelectItem value="growth">Growth — perusahaan tumbuh</SelectItem>
                <SelectItem value="trading">Trading — jangka pendek</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Min. Dividend Yield (%)</Label>
            <Input type="number" min="0" step="0.5" placeholder="cth: 5" value={minDividend} onChange={(e) => setMinDividend(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Max. PER</Label>
            <Input type="number" min="0" step="1" placeholder="cth: 20" value={maxPER} onChange={(e) => setMaxPER(e.target.value)} />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Label>Filter Sektor (opsional, pilih beberapa)</Label>
          <div className="flex flex-wrap gap-2">
            {SECTORS.map((s) => {
              const active = selectedSectors.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSector(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    active
                      ? "bg-primary/20 text-primary border-primary/60 shadow-neon-sm"
                      : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <Button onClick={run} variant="neon" size="lg" className="w-full mt-6" disabled={loading}>
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Menjalankan inferensi...</>
            : <><Cpu className="h-4 w-4" /> Jalankan Mesin Pakar</>}
        </Button>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h2 className="text-xl font-bold">Hasil Rekomendasi</h2>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {results.length} saham · {visible.length} ditampilkan
              </Badge>
            </div>
            <Button variant="neon-outline" size="sm" onClick={() => setTopOnly((v) => !v)}>
              {topOnly ? "Tampilkan semua" : "Tampilkan top 10 saja"}
            </Button>
          </div>

          {visible.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              Tidak ada saham yang cocok dengan filter sektor.
            </Card>
          )}

          {visible.map((r) => (
            <Card key={r.stock.ticker} className="glass border-border/60 p-6 hover:border-primary/40 transition-all">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Score */}
                <div className="flex lg:flex-col items-center gap-4 lg:gap-3 lg:w-32 shrink-0">
                  <div className="relative h-24 w-24">
                    <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
                      <circle cx="50" cy="50" r="42" stroke="hsl(var(--primary))" strokeWidth="8" fill="none"
                        strokeDasharray={`${(r.score / 100) * 263.9} 263.9`} strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.7))" }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold">{r.score}</span>
                      <span className="text-[9px] font-mono text-muted-foreground -mt-1">SCORE</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Badge className={`${verdictColor[r.verdict]} border font-mono text-[10px] px-2.5`}>{r.verdict}</Badge>
                    <span className="text-[10px] font-mono text-muted-foreground">CF: {r.confidence}%</span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-mono font-bold text-2xl text-neon">{r.stock.ticker}</span>
                    <span className="text-muted-foreground">{r.stock.name}</span>
                    <Badge variant="secondary" className="text-[10px]">{r.stock.sector}</Badge>
                  </div>

                  {/* Trade plan */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    <div className="p-3 rounded-lg bg-secondary/40 border border-border/60">
                      <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1"><TrendingUp className="h-3 w-3" /> ENTRY</div>
                      <div className="font-bold text-sm mt-0.5">Rp{r.entryPrice.toLocaleString("id-ID")}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                      <div className="text-[10px] text-success font-mono flex items-center gap-1"><Target className="h-3 w-3" /> TARGET</div>
                      <div className="font-bold text-sm mt-0.5">Rp{r.targetPrice.toLocaleString("id-ID")}</div>
                      <div className="text-[10px] text-success font-mono">+{r.potentialReturn}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                      <div className="text-[10px] text-destructive font-mono flex items-center gap-1"><ShieldAlert className="h-3 w-3" /> STOP LOSS</div>
                      <div className="font-bold text-sm mt-0.5">Rp{r.stopLoss.toLocaleString("id-ID")}</div>
                      <div className="text-[10px] text-destructive font-mono">-7%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <div className="text-[10px] text-primary font-mono flex items-center gap-1"><Clock className="h-3 w-3" /> HORIZON</div>
                      <div className="font-bold text-xs mt-0.5">{r.timeHorizon}</div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="reasons" className="mt-5">
                    <TabsList className="bg-secondary/40">
                      <TabsTrigger value="reasons">Alasan</TabsTrigger>
                      <TabsTrigger value="rules">Rules ({r.firedRules.length})</TabsTrigger>
                      <TabsTrigger value="trace">Forward Chaining</TabsTrigger>
                      <TabsTrigger value="data">Data</TabsTrigger>
                    </TabsList>

                    <TabsContent value="reasons" className="mt-3">
                      <ul className="space-y-1.5">
                        {r.reasons.map((re, i) => (
                          <li key={i} className="text-sm flex gap-2"><span className="text-primary mt-0.5">▸</span><span>{re}</span></li>
                        ))}
                      </ul>
                    </TabsContent>

                    <TabsContent value="rules" className="mt-3">
                      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-2">
                        {r.firedRules.map((f, i) => (
                          <div key={i} className="flex items-start gap-3 p-2.5 rounded-md bg-secondary/30 border border-border/40">
                            <Badge variant="secondary" className="font-mono text-[10px] shrink-0">{f.rule.id}</Badge>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs"><span className="font-mono text-muted-foreground">IF</span> {f.rule.premise}</div>
                              <div className="text-xs"><span className="font-mono text-muted-foreground">THEN</span> {f.rule.conclusion}</div>
                            </div>
                            <div className={`text-xs font-mono shrink-0 ${f.contribution >= 0 ? "text-success" : "text-destructive"}`}>
                              {f.contribution >= 0 ? "+" : ""}{f.contribution.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="trace" className="mt-3">
                      <div className="p-3 rounded-md bg-background/60 border border-border/60 font-mono text-[11px] space-y-1 max-h-72 overflow-y-auto">
                        {r.trace.map((t, i) => (
                          <div key={i} className={`${t.startsWith("▶") || t.startsWith("◆") ? "text-primary" : "text-muted-foreground"}`}>{t}</div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="data" className="mt-3">
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                        {[
                          { l: "PER", v: r.stock.per },
                          { l: "PBV", v: r.stock.pbv },
                          { l: "ROE", v: `${r.stock.roe}%` },
                          { l: "DER", v: r.stock.der },
                          { l: "Yield", v: `${r.stock.dividendYield}%` },
                          { l: "Growth", v: `${r.stock.netProfitGrowth}%` },
                          { l: "RSI", v: r.stock.rsi },
                          { l: "MACD", v: r.stock.macdSignal },
                          { l: "MA50", v: r.stock.ma50Trend },
                          { l: "Vol", v: r.stock.volumeStrength },
                          { l: "Beta", v: r.stock.beta },
                          { l: "Cap", v: `${r.stock.marketCap}T` },
                        ].map((m) => (
                          <div key={m.l} className="p-2 rounded-md bg-secondary/40">
                            <div className="text-[10px] text-muted-foreground font-mono">{m.l}</div>
                            <div className="text-xs font-semibold truncate">{m.v}</div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analyze;
