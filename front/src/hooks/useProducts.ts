import type { getProductSchema } from '@/schemas/ProductSchema';
import api from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const findAllProducts = async (limit?: number) => {
  try {
    const response = await api.get('/products', {
      params: {
        _limit: limit,
      }
    });
    const data = response.data.map((product: getProductSchema) => ({
      value: product.id,
      label: product.name,
    }));
    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};

const fetchCreateProduct = async (newProduct: FormData) => {
  await api.post('/product', newProduct, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const fetchProductsById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};

export const useFetchProducts = (limit?: number) => {
   return useQuery({ queryKey: ['products', limit], queryFn: () => findAllProducts(limit) });
};

export const useFetchPostProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: FormData) => fetchCreateProduct(productData),
    onMutate: () => {
      toast.loading('Cadastrando o produto no sistema de estoque')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.dismiss()
      toast.success('Produto cadastrado com sucesso')
    },
    onError: () => {
      toast.dismiss()
      toast.error('Erro ao cadastra o produto no sistema de estoque')
    },
  });
};

export const useFetchProductById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => fetchProductsById(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      return data;
    },
    onError: () => {
      toast.dismiss()
      toast.error('Erro ao buscar o produto ');
    },
  });
};
