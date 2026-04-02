import type { Snack } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, TrendingUp } from "lucide-react";

interface SnackCardProps {
  snack: Snack;
  onOrder: (snack: Snack) => void;
}

const SnackCard = ({ snack, onOrder }: SnackCardProps) => (
  <Card className="group relative hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/40 bg-card">
    <CardContent className="p-0">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-semibold text-foreground text-lg leading-snug line-clamp-2">
            {snack.name}
          </h3>
          <Badge variant="secondary" className="shrink-0 text-xs gap-1 bg-secondary/80 text-secondary-foreground">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            {snack.ordersCount}
          </Badge>
        </div>
        <div className="flex flex-col mt-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Price</span>
          <p className="text-3xl font-bold text-primary tracking-tight">
            ₹{snack.price}
          </p>
        </div>
        <Button
          className="w-full mt-2 rounded-xl group-hover:shadow-md group-hover:shadow-primary/25 transition-all duration-300"
          onClick={() => onOrder(snack)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Order Now
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default SnackCard;
