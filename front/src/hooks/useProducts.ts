import type { SchemaStockEntry } from "@/schemas/StockEntrySchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchAllProducts = async () => {
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

const fetchProductsById = async (id: string) => {
	try {
		const response = await axios.get(`http://localhost:3001/products/${id}`);
		const data = response.data;
		return data;
	} catch (error) {
		console.error("Erro ao buscar produtos:", error);
	}
};

export const useFetchProducts = () => {
	return useQuery({ queryKey: ["products"], queryFn: fetchAllProducts });
};

export const useFetchProductById = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (productId: string) => fetchProductsById(productId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["products"] });

			return data;
		},
		onError: (error) => {
			console.error("Erro ao buscar o produto ", error);
		},
	});
};
