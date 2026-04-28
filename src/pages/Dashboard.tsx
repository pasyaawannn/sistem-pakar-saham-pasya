import { Link } from "react-router-dom";
import { Brain, TrendingUp, ArrowRight, Activity, BookOpen, Target, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { SAMPLE_STOCKS, KNOWLEDGE_BASE, SECTORS } from "@/lib/expertSystem";

const Dashboard = () => {
  const user = getCurrentUser();

  const bullish = SAMPLE_STOCKS.filter((s) => s.macdSignal === "bullish").length;
  const oversold = SAMPLE_STOCKS.filter((s) => s.rsi < 35).length;
  const highYield = SAMPLE_STOCKS.filter((s) => s.dividendYield >= 5).length;

  return (
    <div className="space-y-8">
      {/* Hello */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Halo, <span className="text-neon">{user?.name?.split(" ")[0]}</span> 👋
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Selamat datang di dashboard sistem pakar saham IDX.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Saham IDX", value: SAMPLE_STOCKS.length, icon: TrendingUp, accent: "text-primary" },
          { label: "Sektor Tercakup", value: SECTORS.length, icon: Database, accent: "text-accent" },
          { label: "Rule Knowledge Base", value: KNOWLEDGE_BASE.length, icon: BookOpen, accent: "text-success" },
          { label: "Sinyal Bullish", value: bullish, icon: Activity, accent: "text-warning" },
        ].map((s) => (
          <Card key={s.label} className="glass border-border/60 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.accent}`} />
            </div>
            <div className="text-3xl font-bold">{s.value}</div>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card className="glass border-primary/30 p-8 relative overflow-hidden shadow-card">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-primary/15 blur-[80px]" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-neon-sm shrink-0">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Jalankan Analisa Sistem Pakar</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Masukkan profil risiko & tujuan investasi Anda. Mesin inferensi akan
                menghasilkan rekomendasi saham beserta penjelasan rule yang fire.
              </p>
            </div>
          </div>
          <Button asChild variant="neon" size="lg" className="shrink-0">
            <Link to="/analyze">Mulai Analisa <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Card>

      {/* Top picks preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Saham Pilihan</h2>
          <Link to="/stocks" className="text-sm text-primary hover:text-primary-glow transition-colors">
            Lihat semua →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_STOCKS.slice(0, 6).map((s) => (
            <Card key={s.ticker} className="glass border-border/60 p-5 hover:border-primary/40 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-mono font-bold text-lg text-neon">{s.ticker}</div>
                  <div className="text-xs text-muted-foreground">{s.name}</div>
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono">{s.sector}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div>
                  <div className="text-[10px] text-muted-foreground font-mono">PER</div>
                  <div className="font-semibold text-sm">{s.per}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-mono">ROE</div>
                  <div className="font-semibold text-sm">{s.roe}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-mono">RSI</div>
                  <div className={`font-semibold text-sm ${s.rsi < 35 ? "text-warning" : s.rsi > 70 ? "text-destructive" : "text-success"}`}>{s.rsi}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
