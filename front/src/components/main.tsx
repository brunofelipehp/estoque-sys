import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFilterProductTable } from '@/hooks/useFilterProductTable';
import { stockEntriesProps } from '@/schemas/StockEntrySchema';
import { FiPlusCircle } from "react-icons/fi";
import { Dashboard } from './Dashboard';

import { Loading } from '@/components/Loading';



export function Main() {
  const { products, loadingProduct } = useFilterProductTable();

  return (
    <div className="flex flex-col w-full bg-zinc-50 mt-32">
      <Dashboard />
      <div className="  w-3/6 mx-auto space-y-7">
        <div className="flex justify-end">
          <a
            href='/products'
            className="bg-zinc-50 border border-violetPrimer text-violetPrimer hover:bg-violetPrimer hover:text-zinc-50 rounded-sm p-2 w-32 flex justify-center gap-2 items-center cursor-pointer transition-all ease-in duration-500 font-medium mt-9"
          >
            Veja Mais
            <FiPlusCircle />
          </a>
        </div>
        <div className="p-2 border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Fornecdor</TableHead>
                <TableHead>Custo Venda</TableHead>
                <TableHead>Custo Comprar</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
              {loadingProduct ? (
                <TableRow>
                  <TableCell colSpan={6} className='relative'>
                    <Loading />
                  </TableCell>
                </TableRow>
              ) :

                (
                  <>
                    {products ? (
                      products.map((products: stockEntriesProps) => {
                        return (
                          <TableRow key={products.productId}>
                            <TableCell>{products.productName}</TableCell>
                            <TableCell>{products.supplier}</TableCell>
                            <TableCell>{products.costPrice}</TableCell>
                            <TableCell>{products.salePrice}</TableCell>
                            <TableCell>{products.quantity}</TableCell>
                            <TableCell>{products.type}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className='text-center'>Não há registro de produto</TableCell>
                      </TableRow>
                    )}
                  </>
                )
              }


            </TableBody>
          </Table>

        </div>

      </div>
    </div>
  );
}
