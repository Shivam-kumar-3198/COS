import { useState } from "react";
import type { Snack } from "@/types";
import { useStudents, useCreateOrder } from "@/hooks/useCanteen";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/labels";
import { toast } from "@/hooks/use-toast";
import { ShoppingBag } from "lucide-react";

interface OrderFormProps {
  snack: Snack | null;
  preselectedStudentId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderForm = ({ snack, preselectedStudentId, open, onOpenChange }: OrderFormProps) => {
  const [studentId, setStudentId] = useState(preselectedStudentId ?? "");
  const [quantity, setQuantity] = useState("1");
  const { data: students } = useStudents();
  const createOrder = useCreateOrder();

  const handleSubmit = () => {
    if (!snack || !studentId) return;
    createOrder.mutate(
      { studentId, snackId: snack.id, quantity: Number(quantity) },
      {
        onSuccess: () => {
          toast({ title: "Order placed! 🎉", description: `${quantity}x ${snack.name} ordered successfully.` });
          onOpenChange(false);
          setStudentId(preselectedStudentId ?? "");
          setQuantity("1");
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to place order.", variant: "destructive" });
        },
      }
    );
  };

  const total = snack ? snack.price * Number(quantity) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-950 border border-border shadow-2xl text-slate-900 dark:text-slate-100">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-primary/10 px-6 py-5">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2.5 text-xl text-slate-900 dark:text-slate-100">
              <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center shadow-sm">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              Order {snack?.name}
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm text-slate-500 dark:text-slate-400">Select a student and quantity to place this order.</DialogDescription>
          </DialogHeader>
        </div>
        <div className="px-6 py-6 space-y-5">
          {!preselectedStudentId && (
            <div className="space-y-2.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Student</Label>
              <Select value={studentId} onValueChange={setStudentId}>
                <SelectTrigger className="rounded-xl h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors focus:ring-primary/30 text-slate-900 dark:text-slate-100"><SelectValue placeholder="Select student" /></SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-border text-slate-900 dark:text-slate-100">
                  {students?.map((s) => (
                    <SelectItem key={s.id} value={s.id} className="rounded-lg">{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quantity</Label>
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger className="rounded-xl h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors focus:ring-primary/30 text-slate-900 dark:text-slate-100"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-border text-slate-900 dark:text-slate-100">
                {[1, 2, 3, 4, 5].map((q) => (
                  <SelectItem key={q} value={String(q)} className="rounded-lg">{q}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-5 flex items-center justify-between shadow-inner">
            <span className="text-sm text-primary/80 font-semibold uppercase tracking-wider">Total Amount</span>
            <span className="text-3xl font-display font-bold text-primary drop-shadow-sm">₹{total}</span>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900 border-t border-border">
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl bg-white dark:bg-slate-950 hover:bg-gray-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">Cancel</Button>
            <Button onClick={handleSubmit} disabled={!studentId || createOrder.isPending} className="rounded-xl shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 px-6">
              {createOrder.isPending ? "Placing…" : "Place Order"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
