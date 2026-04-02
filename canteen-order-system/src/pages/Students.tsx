import { useStudents } from "@/hooks/useCanteen";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import StudentListItem from "@/components/StudentListItem";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const StudentsPage = () => {
  const { data: students, isLoading, isError, refetch } = useStudents();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Students"
        description="Manage students and view their spending history"
        action={
          <Button onClick={() => navigate("/students/new")} className="rounded-xl">
            <Plus className="h-4 w-4" /> Add Student
          </Button>
        }
      />
      {isLoading && <LoadingState count={3} />}
      {isError && <ErrorState message="Failed to load students." onRetry={() => refetch()} />}
      {students && students.length === 0 && <EmptyState message="No students yet. Add one to get started!" />}
      {students && students.length > 0 && (
        <div className="space-y-3">
          {students.map((student, i) => (
            <div key={student.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <StudentListItem student={student} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
