import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateStudent } from "@/hooks/useCanteen";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
});

type FormValues = z.infer<typeof schema>;

const CreateStudent = () => {
  const navigate = useNavigate();
  const createStudent = useCreateStudent();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: "" } });

  const onSubmit = (values: FormValues) => {
    createStudent.mutate(values.name, {
      onSuccess: (student) => {
        toast({
          title: "Student created! 🎉",
          description: `${student.name} — ${student.referralCode}`,
        });
        navigate("/students");
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to create student.", variant: "destructive" });
      },
    });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Add Student" description="Create a new student account" backTo="/students" />
      <Card className="max-w-md overflow-hidden">
        <div className="h-1 bg-primary" />
        <CardContent className="p-6">
          <div className="h-12 w-12 rounded-2xl bg-accent flex items-center justify-center mb-5">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Student Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Aarav Sharma" className="rounded-xl h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="rounded-xl bg-muted p-3 text-xs text-muted-foreground">
                💡 A unique referral code will be generated automatically upon creation.
              </div>
              <Button type="submit" className="w-full rounded-xl h-11" disabled={createStudent.isPending}>
                {createStudent.isPending ? "Creating…" : "Create Student"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStudent;
