import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { fetchProductFilter } from "@/service/api";
import type {  filterStockProps } from '@/service/api'



const stockEntryFormSchema = z.object({
	name: z.string().min(1, { message: "Digite o nome do produto" }),
	supplier: z.string().min(1, { message: "Digite  o nome do fornecedor" }),
	category: z.string().min(1, { message: "Digite  a categoria do produto" }),
	costPrice: z
		.string()
		.min(1, { message: "Digite o Valor" })
		.transform((value) => Number(value)),
	salePrice: z
		.string()
		.min(1, { message: "Digite o Valor" })
		.transform((value) => Number(value)),
	description: z.string().min(1, { message: "Digite a descrição" }),
	image: z.instanceof(File)
});

type SchemaStockEntry = z.infer<typeof stockEntryFormSchema>

export const StockEntry = () => {
	const {control, reset, handleSubmit} = useForm<SchemaStockEntry>()

	const [inputValue, setInputValue] = useState('')
	const [filteredOptions, setFilteredOptions] = useState<filterStockProps[]>([])

	const handleInputChange = async(e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
		const value = e.target.value
		setInputValue(value)
		onChange(value)

		if (value.length > 0) {
			const filtered = await fetchProductFilter(value)
			setFilteredOptions(filtered)

		} else {
			setFilteredOptions([])
		}
	}

	const handleOptionClick = (option: filterStockProps, onChange: (value: string) => void) => {
		setInputValue(option.name)
		onChange(option.name)
	}

	const onSubmit = async(data: SchemaStockEntry) => {
		try {
			const existingProducts = await fetchProductFilter(data.name)
			if (!existingProducts.some((product) => product.name === data.name)) {
				console.log('Produto não encontrado');
				return
			}

			console.log(data);
			reset()
		} catch (error) {
			console.error('Erro ao verificar o produto:', error);
		}
	} 

	
	return (
		<>
			<Header />
			<div className="flex h-screen  bg-zinc-50">
				<Sidebar />
				<div className="flex justify-center mt-24 w-full">
					<form onSubmit={handleSubmit(onSubmit)} className="w-3/6 flex flex-col gap-4">
						<h2 className="text-center text-4xl font-bold">Entrada e Saída</h2>
						<Controller name="name" control={control} render={({field: {onChange} }) => (
							<Popover>
							<PopoverTrigger asChild>
							<div>
							<label htmlFor="nome" className="block">
								Nome
							</label>
							<Input
								type="text"
								className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
								placeholder="Nome do produto"
								onChange={(e) => handleInputChange(e, onChange)}
							/>
						</div>
							</PopoverTrigger>
							<PopoverContent className="w-full">{filteredOptions.length > 0 ? (
								filteredOptions.map((option) => (
									<div key={option.id} onClick={() => handleOptionClick(option, onChange)} onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										handleOptionClick(option, onChange)
									}
									}}>
										{option.name}
									</div>
								))
							) : (
								<div>Nenhum Produto encontrado...</div>
							)}</PopoverContent>
						</Popover>
						)}/>
						

						

						<div className="grid grid-cols-2 w-full gap-2 items-center">
							<div className="">
								<label htmlFor="nome" className="block">
									Preço de custo
								</label>
								<Input
									type="number"
									className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
									placeholder=""
								/>
							</div>
							<div className="">
								<label htmlFor="nome" className="block">
									Preço de venda
								</label>
								<Input
									type="number"
									className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="">Quantidade</label>
							<Input
								type="number"
								name="quanty"
								id="quanty"
								className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
							/>
						</div>
						<div>
							<label htmlFor="">Entrada ou Saída</label>

							<Select>
								<SelectTrigger className="border border-zinc-300 w-full p-4 rounded outline-indigo-400 mb-4">
									<SelectValue placeholder="Entrada" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="entry">Entrada</SelectItem>
									<SelectItem value="out">Saída</SelectItem>
								</SelectContent>
							</Select>
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
