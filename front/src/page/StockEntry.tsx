import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Select as ShadcnSelect,
} from "@/components/ui/select";
import type { filterStockProps } from "@/service/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";
("../components/Sidebar");

const stockEntryFormSchema = z.object({
	name: z.string().min(1, { message: "Digite o nome do produto" }),
	costPrice: z
		.string()
		.min(1, { message: "Digite o Valor" })
		.transform((value) => Number(value)),
	salePrice: z
		.string()
		.min(1, { message: "Digite o Valor" })
		.transform((value) => Number(value)),
	quantity: z
		.string()
		.min(1, { message: "Digite o Valor" })
		.transform((value) => Number(value)),
	type: z.enum(["entry", "out"], {
		errorMap: () => ({
			message: 'O tipo de movimentação deve ser "entrada" ou "saida".',
		}),
	}),
});

type SchemaStockEntry = z.infer<typeof stockEntryFormSchema>;

export const StockEntry = () => {
	const { control, handleSubmit, setValue, register } =
		useForm<SchemaStockEntry>();

	//const [value, setValue] = useState("");

	const [products, setProducts] = useState<filterStockProps[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:5000/products");
				const data = response.data.map((product: filterStockProps) => ({
					value: product.id,
					label: product.name,
				}));
				setProducts(data);
			} catch (error) {
				console.error("Erro ao buscar produtos:", error);
			}
		};

		fetchProducts();
	}, []);

	const onSubmit = (data: SchemaStockEntry) => {
		console.log(data);
	};

	return (
		<>
			<Header />
			<div className="flex h-screen  bg-zinc-50">
				<Sidebar />
				<div className="flex justify-center mt-24 w-full">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-3/6 flex flex-col gap-4"
					>
						<h2 className="text-center text-4xl font-bold">Entrada e Saída</h2>

						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<Select
									options={products}
									placeholder="selecione um produto"
									onChange={(value) =>
										setValue("name", value as unknown as string)
									}
								/>
							)}
						/>

						<div className="grid grid-cols-2 w-full gap-2 items-center">
							<div className="">
								<label htmlFor="nome" className="block">
									Preço de custo
								</label>
								<Input
									type="number"
									className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
									placeholder=""
									{...register("costPrice")}
								/>
							</div>
							<div className="">
								<label htmlFor="nome" className="block">
									Preço de venda
								</label>
								<Input
									type="number"
									className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
									{...register("salePrice")}
								/>
							</div>
						</div>
						<div>
							<label htmlFor="">Quantidade</label>
							<Input
								type="number"
								id="quanty"
								className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
								{...register("quantity")}
							/>
						</div>
						<div>
							<label htmlFor="">Entrada ou Saída</label>

							<ShadcnSelect
								onValueChange={(value: "entry" | "out") =>
									setValue("type", value)
								}
							>
								<SelectTrigger className="border border-zinc-300 w-full p-4 rounded outline-indigo-400 mb-4">
									<SelectValue placeholder="Selecione o tipo" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="entry">Entrada</SelectItem>
									<SelectItem value="out">Saída</SelectItem>
								</SelectContent>
							</ShadcnSelect>
						</div>
						<Button type="submit" className="w-36  p-3 rounded-lg  text-white">
							Enviar
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};
