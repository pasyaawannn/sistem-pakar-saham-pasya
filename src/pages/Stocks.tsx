import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_STOCKS } from "@/lib/expertSystem";

const Stocks = () => {
  const [q, setQ] = useState("");
  const filtered = SAMPLE_STOCKS.filter((s) =>
    s.ticker.toLowerCase().includes(q.toLowerCase()) ||
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.sector.toLowerCase().includes(q.toLowerCase()),
  );

  const trendIcon = (t: string) =>
    t === "up" ? <TrendingUp className="h-3.5 w-3.5 text-success" /> :
    t === "down" ? <TrendingDown className="h-3.5 w-3.5 text-destructive" /> :
    <Minus className="h-3.5 w-3.5 text-muted-foreground" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Saham IDX</h1>
        <p className="text-muted-foreground mt-1.5">
          Daftar saham yang dianalisa oleh sistem pakar (data sampel untuk demo).
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari ticker, nama, atau sektor..."
          className="pl-10"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <Card key={s.ticker} className="glass border-border/60 p-5 hover:border-primary/40 hover:shadow-neon-sm transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-mono font-bold text-xl text-neon">{s.ticker}</div>
                <div className="text-xs text-muted-foreground">{s.name}</div>
              </div>
              <Badge variant="secondary" className="text-[10px]">{s.sector}</Badge>
            </div>

            <div className="text-2xl font-bold mb-3">
              Rp{s.price.toLocaleString("id-ID")}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              {[
                { l: "PER", v: s.per },
                { l: "PBV", v: s.pbv },
                { l: "ROE", v: `${s.roe}%` },
                { l: "DER", v: s.der },
                { l: "Yield", v: `${s.dividendYield}%` },
                { l: "RSI", v: s.rsi },
              ].map((m) => (
                <div key={m.l} className="p-2 rounded-md bg-secondary/40">
                  <div className="text-[10px] text-muted-foreground font-mono">{m.l}</div>
                  <div className="text-sm font-semibold">{m.v}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs">
              <div className="flex items-center gap-1.5 font-mono text-muted-foreground">
                MA50 {trendIcon(s.ma50Trend)}
              </div>
              <div className={`font-mono font-medium ${
                s.macdSignal === "bullish" ? "text-success" :
                s.macdSignal === "bearish" ? "text-destructive" : "text-muted-foreground"
              }`}>
                MACD · {s.macdSignal}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stocks;
