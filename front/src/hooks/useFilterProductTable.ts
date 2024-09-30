import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchAllEntriesProducts = async() => {
      const response = await axios.get('http://localhost:3001/entries');

      const data = response.data

     return data;

}

const fetchSearchProduct = async (nameSearch: string , type: string) => {
  const response = await axios.get('http://localhost:3001/entries');


  if (nameSearch != undefined) {
    const filterProd = response.data.filter(
      (product: { productName: string; type: string }) => {
        const matchesName = nameSearch
          ? product.productName.toLowerCase().includes(nameSearch.toLowerCase())
          : true;
        const matchesType = type ? product.type === type : true;
        return matchesName && matchesType;
      }
    );
    return filterProd;

  } 
};

export const useFilterProductTable = () => {
  const queryClient = useQueryClient();

  const {data: products} =  useQuery({queryKey: ['filterProduct'], queryFn: fetchAllEntriesProducts})

  const {mutateAsync: filterProductTable} = useMutation({
    mutationFn: ({ name, type }: { name: string; type: string }) =>
      fetchSearchProduct(name, type),
    onSuccess: (filteredProducts) => {
      queryClient.setQueryData(['filterProduct'], filteredProducts);
    },
  });

  return {products, filterProductTable}
};


