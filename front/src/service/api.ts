import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface filterStockProps {
  id: string;
  name: string;
}

export const fetchProductFilter = async (
  query: string
): Promise<filterStockProps[]> => {
  try {
    const response = await axios.get<filterStockProps[]>(
      `${API_URL}/products`,
      { params: { name_like: query } }
    );

    return response.data;
  } catch (error) {
    console.error('Error ao buscar o produto', error);
    return [];
  }
};

// // export const fetchProductsById = async (id: string) => {
// // 	try {
// // 		const response = await axios.get(`${API_URL}/products/${id}`);
// // 		const data = response.data;
// // 		return data;
// // 	} catch (error) {
// // 		console.error("Erro ao buscar produtos:", error);
// // 	}
// // };
