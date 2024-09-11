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

interface ProductsProps {
	id: string;
  name: string;
  supplier: string;
  category: string;
  costPrice: number;
  salePrice: number;
  description: string;
  image: string | null;
}


export const FilterProduct = () => {
const [products, setProducts] = useState<ProductsProps[]>([])

	useEffect(() => {
		const fetchData = async() => {
		try {
			const response = await axios.get<ProductsProps[]>('http://localhost:5000/products')

			setProducts(response.data);
		} catch (error) {
			console.error('Erro ao buscar produtos:', error);
		}
		}

		fetchData()
	}, [])

	
	return (
		<>
			<Header />
			<div className="flex h-screen  bg-zinc-50">
				<Sidebar />
				<div className="p-6 mt-24 w-3/6 mx-auto space-y-7">
					<div>
						<form className="flex gap-3 items-center w-2/3">
							<Input name="nome" placeholder="Nome do Produto" />
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
									<TableHead>Custo Compra</TableHead>
									<TableHead>Custo Venda</TableHead>
									<TableHead>Ação</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((products) => {
									return (
										<TableRow key={products.id}>
											<TableCell>{products.name}</TableCell>
											<TableCell>{products.supplier}</TableCell>
											<TableCell>{products.salePrice}</TableCell>
											<TableCell>{products.costPrice}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</>
	);
};
