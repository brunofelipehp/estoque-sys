import type { stockEntriesProps } from '@/schemas/StockEntrySchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchAllStockEntries = async () => {
  await axios.get('http://localhost:3001/products');
};

const fetchStockEntry = async (data: stockEntriesProps) => {
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
    mutationFn: (data: stockEntriesProps) => fetchStockEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockEntries'] });
    },
    onError: (error) => {
      console.error('Error registering the product in stock ', error);
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