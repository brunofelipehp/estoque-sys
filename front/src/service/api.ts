import axios from "axios"

const API_URL = 'http://localhost:5000'

export interface filterStockProps {
  id: string;  
  name: string;
} 

export const fetchProductFilter = async(query: string): Promise<filterStockProps[]> => {
  try {
    const response = await axios.get<filterStockProps[]>(`${API_URL}/products`, {params: {q: query}})

    return response.data
  } catch (error) {
    console.error("Error ao buscar o produto", error);
    return []
    
  }
} 