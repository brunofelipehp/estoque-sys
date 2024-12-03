import type { stockEntriesProps } from '@/schemas/StockEntrySchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const fetchAllStockEntries = async () => {
  await axios.get('http://localhost:3001/products');
};

const fetchStockEntryCreate = async (data: stockEntriesProps) => {
 await axios.post('http://localhost:3001/entries', data);

  return data;
};

const pricesCost = async () =>  {
  const response = await axios.get<stockEntriesProps[]>('http://localhost:3001/entries');


  return response
}

export const useFetchStockEntries = () => {
  return useQuery({
    queryKey: ['stockEntries'],
    queryFn: fetchAllStockEntries,
  });
};

export const useFetchStockEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: stockEntriesProps) => fetchStockEntryCreate(data),
    onMutate: () => {
      toast.loading('Registrando...')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stockEntries'] });

      if (data.type === "Entrada") {
        toast.dismiss()
        toast.success('Entrada de produto registrada com sucesso!!!')
      } else {
        toast.dismiss()
        toast.success('saida de produto registrada com sucesso!!!')
      }
    },
    onError: () => {
      
      toast.dismiss()
      toast.success('Erro ao registra entrada de  produto !!!')
     },
    
  });
  
};

export const usePricesEntries = () => {

const {data} = useQuery({queryKey: ['stockEntries'], queryFn: pricesCost})


  const productEntries = data?.data.reduce((totalPrice: number, product: stockEntriesProps) => {
    return totalPrice + product.totalCost
  }, 0)

  const productOut = data?.data.reduce((totalPrice: number, product: stockEntriesProps) => {
    return totalPrice + product.totalSale
  }, 0)


  const totalPrice = productOut && productEntries ? productOut - productEntries : 0;

  
  

  return {productEntries, productOut, totalPrice}
}