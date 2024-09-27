import { Button } from '@/components/ui/button';
import { Header } from '../components/Header';

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
import { fetchProductFilter } from '@/service/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Sidebar } from '../components/Sidebar';
import { useFilterProductTable } from '@/hooks/useFilterProductTable';
import { stockEntriesProps } from '@/schemas/StockEntrySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

export const filterProductFormSchema = z.object({
  name: z.string().optional(),
  type: z.enum(['Entrada', 'Saída'], {
    errorMap: () => ({
      message: 'O tipo de movimentação deve ser "entrada" ou "saida".',
    }),
  }).optional(),
}).refine((data) => data.name || data.type, {
  message: 'Pelo menos um campo (nome ou tipo) deve ser preenchido.',
  path: ['name', 'type']
})

type FilterProducts = z.infer<typeof filterProductFormSchema>;

export const FilterProduct = () => {
  const [products, setProducts] = useState<stockEntriesProps[]>([]);
  const {mutateAsync: filterProductTableData} = useFilterProductTable()

const {register, handleSubmit, setValue} = useForm<FilterProducts>({
  resolver: zodResolver(filterProductFormSchema)
})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/entries');

        const data = response.data;

        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchData();
  }, []);

  const searchProduct = async (data: FilterProducts) => {

    const{name, type} =  data

    const nameValue: string = name || '';
    const typeValue: string = type || '';

    if (!nameValue && !typeValue) {
      console.log('Nenhum campo foi preenchido para pesquisa');
      return; // Não faz a requisição se o campo estiver vazio
    }

    const filterProd = await filterProductTableData({ name: nameValue, type: typeValue})
      setProducts(filterProd as stockEntriesProps[]);
    
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
              <Input  placeholder="Nome do Produto" {...register("name")}/>

              <Select
              onValueChange={(value: 'Entrada' | 'Saída') => setValue('type', value)}
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
                {products ? (
                  products.map((products) => {
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
                  <p>Não há registro de produto</p>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
