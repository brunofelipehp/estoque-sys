import { Button } from "@/components/ui/button";
import { Header } from "../components/Header";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { IoSearchOutline } from "react-icons/io5";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchProductFilter } from "@/service/api";
// import { stockEntriesProps } from "@/schemas/StockEntrySchema";

interface ProductsProps {
	productId: string;
  productName: string;
  supplier: string;
  category: string;
  costPrice: number;
  salePrice: number;
  quantity: number;
	type: string;
}


export const FilterProduct = () => {
const [products, setProducts] = useState<ProductsProps[]>([])
//const [nameProduct, setNameProduct] = useState<string>("")

	useEffect(() => {
		const fetchData = async() => {
		try {
			const response = await axios.get('http://localhost:3001/entries')

			const data = response.data

			setProducts(data);

			
		} catch (error) {
			console.error('Erro ao buscar produtos:', error);
		}
		}

		fetchData()
	}, [])

	const searchProduct = async(e: React.FormEvent) => {
		e.preventDefault()

		const form = e.target as HTMLFormElement
		const formData = new FormData(form)

		const nameValue = formData.get('name') as string
		try {
			const response = await fetchProductFilter(nameValue)

		console.log(response);
		

			
		} catch (error) {
			console.error('Erro ao buscar produtos:', error);
		}
		}

	
	
	return (
		<>
			<Header />
			<div className="flex h-screen  bg-zinc-50">
				<Sidebar />
				<div className="p-6 mt-24 w-3/6 mx-auto space-y-7">
					<div>
						<form className="flex gap-3 items-center w-2/3" onSubmit={searchProduct}>
							<Input name="name" placeholder="Nome do Produto" />
							<Select>
								<SelectTrigger className="border border-zinc-300  rounded outline-indigo-400 ">
									<SelectValue placeholder="Entrada" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="entry">Entrada</SelectItem>
									<SelectItem value="out">Saída</SelectItem>
								</SelectContent>
							</Select>
							<Button
								type="submit"
								className="bg-zinc-50 border border-indigo-500 text-indigo-500 hover:text-zinc-50 flex gap-2 items-center"
							>
								<IoSearchOutline size={16} />
								filtrar produtos
							</Button>
						</form>
					</div>
					<div className="p-2 border rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nome</TableHead>
									<TableHead>Fornecdor</TableHead>
									<TableHead>Custo Venda</TableHead>
									<TableHead>Custo Comprar</TableHead>
									<TableHead>Quantidade</TableHead>
									<TableHead>Tipo</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products ? products.map((products) => {
									return (
										<TableRow key={products.productId}>
											<TableCell>{products.productName}</TableCell>
											<TableCell>{products.supplier}</TableCell>
											<TableCell>{products.costPrice}</TableCell>
											<TableCell>{products.salePrice}</TableCell>
											<TableCell>{products.quantity}</TableCell>
											<TableCell>{products.type}</TableCell>
										</TableRow>
									);
								}) : (
									<p>Não há registro de produto</p>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</>
	);
};
