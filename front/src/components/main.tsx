import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dashboard } from "./Dashboard";

export function Main() {
  return (
    <div className="flex flex-col w-full bg-zinc-50 mt-32">
      <Dashboard />
      <div className="p-6  w-3/6 mx-auto space-y-7">
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-zinc-50 border border-violetPrimer text-violetPrimer hover:text-zinc-50 flex gap-2 items-center"
          >
            Veja Mais
          </Button>
        </div>
        <div className="p-2 border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Custo Compra</TableHead>
                <TableHead>Custo Venda</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>Smart Tv</TableCell>
                  <TableCell>R$ 2100,00</TableCell>
                  <TableCell>R$ 4200,00</TableCell>
                  <TableCell>Entrada</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
