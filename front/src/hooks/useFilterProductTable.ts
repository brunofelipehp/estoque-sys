import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';


const fetchMovementOfProduct = async (page?: number, limit?: number, productName?: string , type?: string,) => {
  const response = await api.get('/movements',{
    params: {
      limit,
      page,
      productName,
      type
    }
  });


  const {movements, totalPages, profit, expenses, totalProfit} = response.data
 
  
    return {movements, totalPages, profit, expenses, totalProfit}

  } 


export const useMovementOfProduct = (page?: number, limit?: number, productName?: string, type?: string ) => {
  

  const {data, isLoading: loadingProduct} =  useQuery({queryKey: ['filterProduct', limit, page, productName, type], queryFn: () => fetchMovementOfProduct(page, limit, productName, type)})

  const products = data?.movements || []
  const totalPages = data?.totalPages || 1
  const profit = data?.profit
  const expenses = data?.expenses
  const totalProfit = data?.totalProfit
   
  return {products, loadingProduct, totalPages, profit, expenses, totalProfit}


};


