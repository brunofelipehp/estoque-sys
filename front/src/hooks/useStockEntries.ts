import type { stockEntriesProps } from '@/schemas/StockEntrySchema';
import api from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const fetchStockMovementCreate = async (data: stockEntriesProps) => {

    await api.post('/movement', data);

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
      toast.dismiss()
      if (data && data.type === "entry") {
     
        toast.success('Entrada de produto registrada com sucesso!!!')
      } else if (data && data.type === "out") {
     
        toast.success('saida de produto registrada com sucesso!!!')
      }
    },
    onError: (error) => {
      const errorMessage = (error as any)?.response?.data?.message || 'Erro ao registra entrada de  produto !!!';
      toast.dismiss()
      toast.error(errorMessage)
     },
    
  });
  
};
