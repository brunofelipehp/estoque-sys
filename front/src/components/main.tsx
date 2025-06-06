import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMovementOfProduct } from '@/hooks/useFilterProductTable';
import { StockMovementsProps } from '@/schemas/StockEntrySchema';
import { FiPlusCircle } from "react-icons/fi";
import { Dashboard } from './Dashboard';

import { Loading } from '@/components/Loading';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormart';
import { Link } from 'react-router-dom';



export function Main() {

  const page = 1
  const limit = 5;
  const { products, loadingProduct } = useMovementOfProduct(page, limit);

  const { formatCurrencyBrl } = useCurrencyFormat()

  return (
    <div className="flex flex-col w-full bg-zinc-50 mt-32">

      <Dashboard />
      <div className="  w-3/6 mx-auto space-y-7">
        <div className="flex justify-end">
          <Link
            to={`/products`}
            className="bg-zinc-50 border border-violetPrimer text-violetPrimer hover:bg-violetPrimer hover:text-zinc-50 rounded-sm p-2 w-32 flex justify-center gap-2 items-center cursor-pointer transition-all ease-in duration-500 font-medium mt-9"
          >
            Veja Mais
            <FiPlusCircle />
          </Link>
        </div>
        <div className="p-2 border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow >
                <TableHead className='text-center'>Nome</TableHead>
                <TableHead className='text-center'>Fornecedor</TableHead>
                <TableHead className='text-center'>Preço unidade</TableHead>
                <TableHead className='text-center'>Quantidade</TableHead>
                <TableHead className='text-center'>Cores</TableHead>
                <TableHead className='text-center'>Movimentação</TableHead>
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
                      products.map((product: StockMovementsProps) => {
                        return (
                          <TableRow key={product.id} className='text-center'>
                            <TableCell>{product.product.name}</TableCell>
                            <TableCell>{product.product.supplier}</TableCell>
                            <TableCell>{formatCurrencyBrl(product.price)}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.product.color}</TableCell>
                            <TableCell>{product.type == 'IN' ? "Entrada" : "Saída"}</TableCell>
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
        {/* <PaginationForm page={newPage} pages={totalPages} /> */}
      </div>
    </div >
  );
}
