import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";

const fetchSearchProduct = async(nameSearch: string) => {
    const response = await axios.get('http://localhost:3001/entries', {
      params: nameSearch
        ? {
            name_like: nameSearch,
          }
        : {},
    });

    const filterProd = response.data.filter(
      (product: { productName: string }) =>
        product.productName.toLowerCase().includes(nameSearch.toLowerCase())
    );
    
    return filterProd
}


export const useFilterProductTable = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: string) => fetchSearchProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['filterProduct']})
    }
  })
}