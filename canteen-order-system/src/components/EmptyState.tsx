import { PackageOpen } from "lucide-react";

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4 animate-fade-in">
    <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
      <PackageOpen className="h-8 w-8 text-muted-foreground/60" />
    </div>
    <p className="text-muted-foreground font-medium">{message}</p>
  </div>
);

export default EmptyState;
