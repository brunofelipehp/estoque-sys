import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";

const fetchSearchProduct = async(nameSearch: string, type: string,) => {
    const response = await axios.get('http://localhost:3001/entries');
if (nameSearch) {
  const filterProd = response.data.filter(
    (product: { productName: string, type: string }) => {
     const matchesName = nameSearch ? product.productName.toLowerCase().includes(nameSearch.toLowerCase()) : true
     const matchesType = type ? product.type === type : true
     return matchesName && matchesType
    }
  );
  return filterProd
}
    
    
    
}


export const useFilterProductTable = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({name, type}:{name: string, type: string}) => fetchSearchProduct(name, type),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['filterProduct']})
    }
  })
}