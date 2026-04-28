import { Link, Navigate } from "react-router-dom";
import { Sparkles, Brain, TrendingUp, Shield, Zap, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";

const Landing = () => {
  const user = getCurrentUser();
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-hero opacity-70 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/15 blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-neon-sm">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Saham<span className="text-neon">Pakar</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost"><Link to="/login">Masuk</Link></Button>
          <Button asChild variant="neon"><Link to="/register">Daftar</Link></Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 container pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/30 mb-6 animate-float">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">RULE-BASED · SCORING · FORWARD CHAINING</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.05]">
          Sistem Pakar <span className="text-neon">Saham IDX</span><br />
          Berbasis AI
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
          Rekomendasi saham otomatis dari analisa fundamental dan teknikal.
          Mesin inferensi rule-based yang menjelaskan setiap keputusan.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <Button asChild variant="neon" size="lg" className="text-base h-12 px-8">
            <Link to="/register">Mulai Analisa Gratis →</Link>
          </Button>
          <Button asChild variant="neon-outline" size="lg" className="text-base h-12 px-8">
            <Link to="/login">Masuk</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground font-mono mt-8">
          Python · C++ · React · Tugas Kecerdasan Buatan
        </p>
      </section>

      {/* Features */}
      <section className="relative z-10 container pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Brain, title: "Mesin Inferensi", desc: "Rule-based forward chaining + scoring 0–100 untuk verdict STRONG BUY hingga SELL." },
            { icon: TrendingUp, title: "Analisa Hibrid", desc: "Gabungan fundamental (PER, PBV, ROE, DER) dan teknikal (RSI, MACD, MA50)." },
            { icon: Code2, title: "Python + C++", desc: "Backend FastAPI + JWT, indikator teknikal dihitung modul C++ via subprocess." },
            { icon: Shield, title: "Profil Risiko", desc: "Sesuaikan rekomendasi dengan profil konservatif, moderat, atau agresif." },
            { icon: Zap, title: "Penjelasan Transparan", desc: "Setiap rekomendasi disertai daftar rule yang fire & alasan keputusan." },
            { icon: Sparkles, title: "Saham Pilihan IDX", desc: "BBCA, BBRI, BMRI, TLKM, ASII, UNVR, dan saham unggulan lainnya." },
          ].map((f) => (
            <Card key={f.title} className="glass border-primary/15 p-6 hover:border-primary/40 hover:shadow-neon-sm transition-all">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/40">
        <div className="container py-6 text-center text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} SahamPakar — Project Kecerdasan Buatan
        </div>
      </footer>
    </div>
  );
};

export default Landing;
