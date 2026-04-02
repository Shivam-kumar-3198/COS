import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStudent, useSnacks } from "../hooks/useCanteen";
import PageHeader from "../components/PageHeader";
import OrderForm from "../components/OrderForm";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Plus, Wallet, Hash, ShoppingBag } from "lucide-react";
import type { Snack } from "@/types";

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useStudent(id!);
  const { data: snacks } = useSnacks();
  const [orderSnack, setOrderSnack] = useState<Snack | null>(null);

  if (isLoading) return <div className="py-8"><LoadingState count={2} /></div>;
  if (isError || !data) return <ErrorState message="Student not found." onRetry={() => refetch()} />;

  const handleNewOrder = () => {
    if (snacks && snacks.length > 0) setOrderSnack(snacks[0]);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={data.name}
        backTo="/students"
        action={
          <Button onClick={handleNewOrder} className="rounded-xl">
            <Plus className="h-4 w-4" /> New Order
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="overflow-hidden">
          <div className="h-1 bg-muted-foreground/20" />
          <CardContent className="p-5 text-center">
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-2">
              <Hash className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Referral Code</p>
            <p className="font-mono font-bold text-foreground mt-1 text-lg">{data.referralCode}</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 bg-primary" />
          <CardContent className="p-5 text-center">
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center mx-auto mb-2">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Total Spent</p>
            <p className="text-2xl font-display font-bold text-primary mt-1">₹{data.totalSpent}</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-1 bg-success" />
          <CardContent className="p-5 text-center">
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-2">
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Total Orders</p>
            <p className="text-2xl font-display font-bold text-foreground mt-1">{data.orders.length}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="font-display text-xl font-bold text-foreground mb-4">Order History</h2>
      {data.orders.length === 0 ? (
        <EmptyState message="No orders placed yet." />
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Snack</TableHead>
                <TableHead className="text-center font-medium">Qty</TableHead>
                <TableHead className="text-right font-medium">Amount</TableHead>
                <TableHead className="text-right font-medium">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.orders.map((order) => (
                <TableRow key={order.id} className="group">
                  <TableCell className="font-medium">{order.snackName}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="rounded-lg">{order.quantity}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">₹{order.payableAmount}</TableCell>
                  <TableCell className="text-right text-muted-foreground text-xs">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <OrderForm
        snack={orderSnack}
        preselectedStudentId={id}
        open={!!orderSnack}
        onOpenChange={(o) => !o && setOrderSnack(null)}
      />
    </div>
  );
};

export default StudentDetail;
