import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorState = ({ message, onRetry }: { message?: string; onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4 animate-fade-in">
    <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
      <AlertCircle className="h-8 w-8 text-destructive" />
    </div>
    <div>
      <p className="font-display font-semibold text-foreground">Something went wrong</p>
      <p className="text-muted-foreground text-sm mt-1">{message ?? "An unexpected error occurred."}</p>
    </div>
    {onRetry && (
      <Button variant="outline" onClick={onRetry} className="rounded-xl">
        Try again
      </Button>
    )}
  </div>
);

export default ErrorState;
