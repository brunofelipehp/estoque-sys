import type { SchemaStockEntry } from "@/schemas/StockEntrySchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
	try {
		const response = await axios.get("http://localhost:3001/products");
		const data = response.data.map((product: SchemaStockEntry) => ({
			value: product.id,
			label: product.name,
		}));
		return data;
	} catch (error) {
		console.error("Erro ao buscar produtos:", error);
	}
};

// const producStockEntry = async (data: string) => {
// 	try {
// 		const response = await axios.post(`http://localhost:3001/entries/`, data);
// 		const data = response.data;
// 		return data;
// 	} catch (error) {
// 		console.error("Erro ao buscar produtos:", error);
// 	}
// };

const fetchProductsById = async (id: string) => {
	try {
		const response = await axios.get(`http://localhost:3001/products/${id}`);
		const data = response.data;
		return data;
	} catch (error) {
		console.error("Erro ao buscar produtos:", error);
	}
};

export const useStockEntries = () => {
	return useQuery({ queryKey: ["stockEntries"], queryFn: fetchProducts });
};

export const useFetchStockEntriesById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (productId: string) => fetchProductsById(productId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stockEntries"] });
		},
		onError: (error) => {
			console.error("Erro ao buscar o produto ", error);
		},
	});
};

// export const useFetchStockEntries = () = {
// 	const queryClient = QueryClient()

// 	return useMutation({
// 		mutationFn:
// 	})
// }
