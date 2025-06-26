import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Sidebar } from "@/components/Sidebar";
import { useFetchProductById } from "@/hooks/useProducts";
import { useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormart";
import { StockMovementsProps } from "@/schemas/StockEntrySchema";


export const Product = () => {
  const { productId } = useParams();
  console.log(productId);

  const { movement, profit, expenses, totalProfit, isLoading } = useFetchProductById(productId as string);
  const movementDetails = movement as StockMovementsProps;

  const { formatCurrencyBrl } = useCurrencyFormat();

  return (
    <>
      <Header />
      <div className="flex  bg-zinc-50">
        <Sidebar />
        <div className="flex justify-center w-full">
          {isLoading ? (
            <Loading />
          ) : (
            <div className=" ">

              <div className=" flex justify-center mb-5 mt-24">
                <img className="w-[400px] h-80  rounded-lg" src={`${movementDetails.product.imageUrl ?? ""}`} alt="imagem do produto" />
              </div>

              <div className=" w-[950px]">
                <Table>
                  <TableHeader>
                    <TableRow>

                      <TableHead className="text-3xl font-semibold ">Informaçoes do produto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className=" font-semibold">Nome</TableCell>
                      <TableCell>{movementDetails.product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">Cor</TableCell>
                      <TableCell>{movementDetails.product.color}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className=" font-semibold">Categoria</TableCell>
                      <TableCell>{movementDetails.product.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">Tamanho</TableCell>
                      <TableCell>{movementDetails.product?.size ?? "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">Descrição</TableCell>
                      <TableCell>{movementDetails.product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">Fonrecedor</TableCell>
                      <TableCell>{movementDetails.product.supplier}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">Quantidade em estoque</TableCell>
                      <TableCell>{movementDetails.product.stock}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">Preço de custo</TableCell>
                      <TableCell>{formatCurrencyBrl(movementDetails.price)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">Total de investimento</TableCell>
                      <TableCell>{formatCurrencyBrl(expenses)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">total em vendas</TableCell>
                      <TableCell>{formatCurrencyBrl(profit)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" font-semibold">Lucro total</TableCell>
                      <TableCell>{formatCurrencyBrl(totalProfit)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

            </div>

          )}

        </div>
      </div >
    </>
  )
}