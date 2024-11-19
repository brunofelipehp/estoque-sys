import { Button } from '@/components/ui/button';
import { Header } from '../components/Header';

import { Loading } from '@/components/Loading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IoSearchOutline } from 'react-icons/io5';
import { MdLibraryBooks } from 'react-icons/md';
import { z } from 'zod';
import { Sidebar } from '../components/Sidebar';

export const filterProductFormSchema = z
  .object({
    name: z.string().optional(),
    type: z
      .enum(['Entrada', 'Saída'], {
        errorMap: () => ({
          message: 'O tipo de movimentação deve ser "entrada" ou "saida".',
        }),
      })
      .optional(),
  })
  .refine((data) => data.name || data.type, {
    message: 'Pelo menos um campo (nome ou tipo) deve ser preenchido.',
    path: ['name', 'type'],
  });

type FilterProducts = z.infer<typeof filterProductFormSchema>;

export const FilterProduct = () => {
  const { filterProductTable, products, loadingProduct, loadingFilter } = useFilterProductTable();


  const { register, handleSubmit, setValue, } = useForm<FilterProducts>({
    resolver: zodResolver(filterProductFormSchema),
  });


  const searchProduct = async (data: FilterProducts) => {
    const { name, type } = data;

    if (!name && !type) {
      console.log("Preencha ao menos um campo para buscar.");
      return;
    }

    await filterProductTable({ name: name || '', type: type || '' });

  };

  return (
    <>
      <Header />
      <div className="flex h-screen  bg-zinc-50">
        <Sidebar />
        <div className="p-6 mt-24 w-3/6 mx-auto space-y-7">
          <div>
            <form
              className="flex gap-3 items-center w-2/3"
              onSubmit={handleSubmit(searchProduct)}
            >
              <Input placeholder="Nome do Produto" {...register('name')} />

              <Select
                onValueChange={(value: 'Entrada' | 'Saída') =>
                  setValue('type', value)
                }
              >
                <SelectTrigger className="border border-zinc-300  rounded outline-indigo-400 ">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entrada">Entrada</SelectItem>
                  <SelectItem value="Saída">Saída</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="bg-zinc-50 border border-indigo-500 text-indigo-500 hover:text-zinc-50 flex gap-2 items-center"
              >
                <IoSearchOutline size={16} />
                filtrar produtos
              </Button>
            </form>
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
              <TableBody>
                {loadingProduct || loadingFilter ?
                  <TableRow>
                    <TableCell colSpan={6} className='relative'>
                      <Loading />
                    </TableCell>
                  </TableRow>
                  :
                  <>
                    {products && products.length > 0 ? (
                      products.map((product: stockEntriesProps) => {
                        return (
                          <TableRow key={product.productId}>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.supplier}</TableCell>
                            <TableCell>{product.costPrice}</TableCell>
                            <TableCell>{product.salePrice}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.type}</TableCell>
                            <TableCell>
                              <a href="" className='text-violetPrimer'>
                                <MdLibraryBooks size={24} />
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className='text-center'>Não há registro de produto</TableCell>
                      </TableRow>
                    )}
                  </>
                }

              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
