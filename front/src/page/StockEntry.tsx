import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import type { SchemaStockEntry } from "@/schemas/StockEntrySchema";

import Select from "react-select";

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

import axios from "axios";

("../components/Sidebar");

interface OptionsProducts {
	value: string;
	label: string;
}

export const StockEntry = () => {
	const { control, handleSubmit, setValue, register } =
		useForm<SchemaStockEntry>();

	const [products, setProducts] = useState<OptionsProducts[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:3001/products");
				const data = response.data.map((product: SchemaStockEntry) => ({
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

	const onSubmit = async (data: SchemaStockEntry) => {
		const id = data.name.value;

		try {
			const response = await axios.get(`http://localhost:3001/products/${id}`);

			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
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
									{...field}
									options={products}
									placeholder="selecione um produto"
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
