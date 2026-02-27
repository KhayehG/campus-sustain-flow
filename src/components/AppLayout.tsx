import { Leaf, LogOut, LayoutDashboard, FolderKanban, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    ...(isAdmin ? [{ label: "Approvals", href: "/admin", icon: ShieldCheck }] : []),
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="gradient-hero sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2 text-primary-foreground">
            <Leaf className="h-6 w-6" />
            <span className="font-display text-lg font-bold">SCPT</span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-primary-foreground/80 text-sm hidden sm:block">
              {user?.fullName}
              <span className="ml-1.5 text-xs bg-primary-foreground/20 px-2 py-0.5 rounded-full">
                {user?.role === "admin" ? "Coordinator" : "Student/Staff"}
              </span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8 animate-fade-in">{children}</main>
    </div>
  );
};

export default AppLayout;
