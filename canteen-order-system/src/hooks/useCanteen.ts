import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSnacks, fetchStudents, fetchStudent, createStudent, createOrder } from "@/api/endpoints";

export function useSnacks() {
  return useQuery({ queryKey: ["snacks"], queryFn: fetchSnacks });
}

export function useStudents() {
  return useQuery({ queryKey: ["students"], queryFn: fetchStudents });
}

export function useStudent(id: string) {
  return useQuery({ queryKey: ["students", id], queryFn: () => fetchStudent(id), enabled: !!id });
}

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createStudent(name),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { studentId: string; snackId: string; quantity: number }) =>
      createOrder(vars.studentId, vars.snackId, vars.quantity),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["snacks"] });
      qc.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
