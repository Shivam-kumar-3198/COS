import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: string;
  action?: ReactNode;
}

const PageHeader = ({ title, description, backTo, action }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between gap-4 mb-8 animate-fade-in">
      <div className="flex items-start gap-3">
        {backTo && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(backTo)}
            className="mt-0.5 shrink-0 rounded-xl h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {description && <p className="text-muted-foreground text-sm mt-1.5">{description}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default PageHeader;
