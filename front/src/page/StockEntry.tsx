import { FormStockEntry } from '@/components/FormStockEntry';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export function StockEntry() {
  return (
    <>
      <Header />
      <div className="flex h-screen  bg-zinc-50">
        <Sidebar />
        <FormStockEntry />
      </div>
    </>
  );
}
