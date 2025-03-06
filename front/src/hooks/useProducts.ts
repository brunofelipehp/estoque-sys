import type { getProductSchema, ProductSchema } from '@/schemas/ProductSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const fetchAllProducts = async (limit?: number) => {
  try {
    const response = await axios.get('http://localhost:7000/products', {
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

const fetchProduct = async (newProduct: ProductSchema) => {
  await axios.post('http://localhost:7000/product', newProduct);
};

const fetchProductsById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:7000/products/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};

export const useFetchProducts = (limit?: number) => {
   return useQuery({ queryKey: ['products', limit], queryFn: () => fetchAllProducts(limit) });
};

export const useFetchPostProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: ProductSchema) => fetchProduct(productData),
    onMutate: () => {
      toast.loading('Cadastrando o produto no sistema de estoque')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.dismiss()
      toast.success('Produto cadastrado com sucesso')
    },
    onError: (error) => {
      console.error('Error ao registra o produto no banco ', error);
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
    onError: (error) => {
      console.error('Erro ao buscar o produto ', error);
    },
  });
};
