import { useState } from "react";
import type { Snack } from "@/types";
import { useSnacks } from "@/hooks/useCanteen";
import PageHeader from "@/components/PageHeader";
import SnackCard from "@/components/SnackCard";
import OrderForm from "@/components/OrderForm";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

const SnacksPage = () => {
  const { data: snacks, isLoading, isError, refetch } = useSnacks();
  const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null);

  return (
    <div className="animate-fade-in">
      <PageHeader title="🍿 Snacks Menu" description="Browse our delicious snacks and place your order" />
      {isLoading && <LoadingState count={8} />}
      {isError && <ErrorState message="Failed to load snacks." onRetry={() => refetch()} />}
      {snacks && snacks.length === 0 && <EmptyState message="No snacks available right now." />}
      {snacks && snacks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {snacks.map((snack, i) => (
            <div key={snack.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <SnackCard snack={snack} onOrder={setSelectedSnack} />
            </div>
          ))}
        </div>
      )}
      <OrderForm snack={selectedSnack} open={!!selectedSnack} onOpenChange={(o) => !o && setSelectedSnack(null)} />
    </div>
  );
};

export default SnacksPage;
