import type { stockEntriesProps } from "@/schemas/StockEntrySchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchAllStockEntries = async () => {
	await axios.get("http://localhost:3001/products");
};

const fetchStockEntry = async (data: stockEntriesProps) => {
	const {
		id,
		productId: product_id,
		productName: product_name,
		category,
		supplier,
		costPrice: cost_price,
		salePrice: sale_price,
		quantity,
		type,
	} = data;

	await axios.post("http://localhost:3001/entries", {
		id,
		product_id,
		product_name,
		category,
		supplier,
		cost_price,
		sale_price,
		quantity,
		type,
	});

	return data;
};

export const useFetchStockEntries = () => {
	return useQuery({
		queryKey: ["stockEntries"],
		queryFn: fetchAllStockEntries,
	});
};

export const useFetchStockEntry = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: stockEntriesProps) => fetchStockEntry(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stockEntries"] });
		},
		onError: (error) => {
			console.error("Error registering the product in stock ", error);
		},
	});
};
