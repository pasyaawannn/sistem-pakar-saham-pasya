import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { KNOWLEDGE_BASE, type RuleCategory } from "@/lib/expertSystem";

const CATEGORIES: (RuleCategory | "Semua")[] = ["Semua", "Fundamental", "Teknikal", "Tujuan", "Risiko", "Filter"];

const catColor: Record<string, string> = {
  Fundamental: "bg-primary/20 text-primary border-primary/40",
  Teknikal: "bg-accent/20 text-accent border-accent/40",
  Tujuan: "bg-success/20 text-success border-success/40",
  Risiko: "bg-warning/20 text-warning border-warning/40",
  Filter: "bg-destructive/20 text-destructive border-destructive/40",
};

const KnowledgeBase = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("Semua");

  const filtered = KNOWLEDGE_BASE.filter((r) =>
    (cat === "Semua" || r.category === cat) &&
    (q === "" ||
      r.id.toLowerCase().includes(q.toLowerCase()) ||
      r.premise.toLowerCase().includes(q.toLowerCase()) ||
      r.conclusion.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" /> Knowledge Base
        </h1>
        <p className="text-muted-foreground mt-1.5">
          {KNOWLEDGE_BASE.length} aturan IF-THEN dengan bobot dan certainty factor (CF).
          Dipakai oleh mesin inferensi forward chaining.
        </p>
      </div>

      {/* Penjelasan singkat */}
      <Card className="glass border-primary/20 p-5">
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">Metode</div>
            <div>Rule-based + Forward Chaining + Certainty Factor</div>
          </div>
          <div>
            <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">Skor Akhir</div>
            <div>Skor 0–100 = 50 + Σ(weight × CF) tiap rule yang fire</div>
          </div>
          <div>
            <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">Verdict</div>
            <div>≥80 STRONG BUY · ≥65 BUY · ≥45 HOLD · ≥30 SELL · &lt;30 STRONG SELL</div>
          </div>
        </div>
      </Card>

      {/* Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Cari rule (cth: PER, RSI, dividen)..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                cat === c
                  ? "bg-primary/20 text-primary border-primary/60 shadow-neon-sm"
                  : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Rule list */}
      <div className="space-y-2">
        {filtered.map((r) => (
          <Card key={r.id} className="glass border-border/60 p-4 hover:border-primary/40 transition-all">
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="font-mono shrink-0 text-xs">{r.id}</Badge>
              <Badge className={`${catColor[r.category]} border text-[10px] shrink-0`}>{r.category}</Badge>

              <div className="flex-1 min-w-0 grid md:grid-cols-2 gap-2">
                <div className="text-sm">
                  <span className="font-mono text-xs text-muted-foreground mr-1">IF</span>
                  {r.premise}
                </div>
                <div className="text-sm">
                  <span className="font-mono text-xs text-muted-foreground mr-1">THEN</span>
                  {r.conclusion}
                </div>
              </div>

              <div className="flex flex-col items-end gap-0.5 shrink-0 font-mono text-xs">
                <span className={r.weight >= 0 ? "text-success" : "text-destructive"}>
                  {r.weight >= 0 ? "+" : ""}{r.weight}
                </span>
                <span className="text-muted-foreground">CF {r.cf}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-8 text-center text-muted-foreground">
          Tidak ada rule yang cocok.
        </Card>
      )}
    </div>
  );
};

export default KnowledgeBase;
