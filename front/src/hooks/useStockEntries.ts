import type { stockEntriesProps } from '@/schemas/StockEntrySchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const fetchStockMovementCreate = async (data: stockEntriesProps) => {
 await axios.post('http://localhost:7000/movement', data);

  return data;
};


export const useFetchStockMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: stockEntriesProps) => fetchStockMovementCreate(data),
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
      toast.error('Erro ao registra entrada de  produto !!!')
     },
    
  });
  
};
