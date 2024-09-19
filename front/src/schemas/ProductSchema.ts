import { z } from "zod";

export const createProductSchema = z.object({
	name: z.string().min(1, { message: "Digite o nome do produto" }),
	supplier: z.string().min(1, { message: "Digite  o nome do fornecedor" }),
	category: z.string().min(1, { message: "Digite  a categoria do produto" }),
	description: z.string().min(1, { message: "Digite a descrição" }),
	image: z
		.string()
		.url({ message: "Por favor, insira uma URL válida para a imagem" }),
});

export type ProductSchema = z.infer<typeof createProductSchema>;
