import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchSearchProduct = async (page?: number, limit?: number, productName?: string , type?: string,) => {
  const response = await axios.get('http://localhost:7000/movements',{
    params: {
      limit,
      page,
      productName,
      type
    }
  });


  const {movements, totalPages} = response.data
 
  
    return {movements, totalPages}

  } 


export const useFilterProductTable = (page?: number, limit?: number, productName?: string, type?: string ) => {
  

  const {data, isLoading: loadingProduct} =  useQuery({queryKey: ['filterProduct', limit, page, productName, type], queryFn: () => fetchSearchProduct(page, limit, productName, type)})

  const products = data?.movements || []
  const totalPages = data?.totalPages || 1
   
  return {products, loadingProduct, totalPages}


};


