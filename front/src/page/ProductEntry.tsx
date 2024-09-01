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

export const ProductEntry = () => {
	return (
		<>
			<Header />
			<div className="flex h-screen  bg-zinc-50">
				<Sidebar />
				<div className="flex justify-center mt-24 w-full">
					<form action="" className="w-3/6 flex flex-col gap-4">
						<h2 className="text-center text-4xl font-bold">Entrada e Saída</h2>
						<div>
							<label htmlFor="nome" className="block">
								Nome
							</label>
							<Input
								type="text"
								className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
								placeholder="Nome do produto"
							/>
						</div>

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
