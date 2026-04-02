import type { Student } from "@/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Wallet, Hash } from "lucide-react";

const StudentListItem = ({ student }: { student: Student }) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300">
      <CardContent className="p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center shrink-0 text-lg font-display font-bold text-accent-foreground">
            {student.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
            <p className="text-xs text-muted-foreground font-mono flex items-center gap-1 mt-0.5">
              <Hash className="h-3 w-3" />{student.referralCode}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
              <Wallet className="h-3 w-3" /> Spent
            </p>
            <p className="font-bold text-foreground">₹{student.totalSpent}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => navigate(`/students/${student.id}`)}
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentListItem;
