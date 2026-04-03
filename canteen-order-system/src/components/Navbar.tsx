import { NavLink } from "@/components/Navlink";
import { UtensilsCrossed, GraduationCap } from "lucide-react";

const Navbar = () => (
  <nav className="border-b bg-card/90 backdrop-blur-lg sticky top-0 z-40">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-glow">
          <UtensilsCrossed className="h-4.5 w-4.5 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <span className="font-display font-bold text-foreground text-base tracking-tight">Canteen</span>
          <span className="text-[10px] text-muted-foreground block -mt-0.5 tracking-wide uppercase">Ordering System</span>
        </div>
      </div>
      <div className="flex gap-1 bg-secondary/60 rounded-xl p-1">
        <NavLink
          to="/"
          end
          className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
        >
          🍿 Snacks
        </NavLink>
        <NavLink
          to="/students"
          className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
        >
          <span className="flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" /> Students
          </span>
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
