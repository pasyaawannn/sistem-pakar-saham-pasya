import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sparkles, LogOut, LayoutDashboard, TrendingUp, Brain, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/lib/auth";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/analyze", label: "Analisa", icon: Brain },
    { to: "/stocks", label: "Saham IDX", icon: TrendingUp },
    { to: "/knowledge", label: "Knowledge Base", icon: BookOpen },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-neon-sm">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight">Saham<span className="text-neon">Pakar</span></span>
              <span className="text-[10px] font-mono text-muted-foreground -mt-0.5">EXPERT.SYS v1.0</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/15 text-primary shadow-neon-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                  active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="container py-8">{children}</main>

      <footer className="border-t border-border/40 mt-16">
        <div className="container py-6 text-center text-xs text-muted-foreground font-mono">
          SahamPakar — Sistem Pakar Rule-Based + Scoring · Python · C++ · React · Tugas Kecerdasan Buatan
        </div>
      </footer>
    </div>
  );
};
