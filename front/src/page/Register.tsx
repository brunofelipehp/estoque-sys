import { Button } from "@/components/ui/button";
import { Header } from "../components/Header";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";

export const Register = () => {
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				setPreviewImage(reader.result as string);
			};

			reader.readAsDataURL(file);
		}
	};
	return (
		<>
			<Header />
			<div className="flex h-screen  bg-zinc-50">
				<Sidebar />
				<div className="flex justify-center mt-24 w-full">
					<form action="" className="w-3/6 flex flex-col gap-4">
						<h2 className="text-center text-4xl font-bold">
							Cadastro de Produto
						</h2>
						<div>
							<label
								htmlFor="input-image"
								className="w-[400px] h-[300px] bg-[#ddd] items-center justify-center border-[2px] border-dashed"
							>
								<span className="w-full"> dsfsdf</span>
							</label>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								name="input-image"
							/>
						</div>
						<div>
							{previewImage && (
								<img
									src={previewImage}
									alt="Preview"
									className="w-80 h-52 mt-8 filter brightness-75 items-center rounded-xl"
								/>
							)}
						</div>
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
						<div>
							<label htmlFor="categoria" className="block">
								Fornecedor
							</label>
							<Input
								type="text"
								className="border border-zinc-300 w-3/4 p-4 rounded outline-indigo-400"
								placeholder="Fornecedor"
							/>
						</div>
						<div>
							<label htmlFor="categoria" className="block">
								Categoria
							</label>
							<Input
								type="text"
								className="border border-zinc-300 w-2/3 p-4 rounded outline-indigo-400"
								placeholder="Categoria"
							/>
						</div>
						<div className="flex gap-2">
							<div className="w-3/6">
								<label htmlFor="nome" className="block">
									Preço de custo
								</label>
								<Input
									type="number"
									className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
									placeholder=""
								/>
							</div>
							<div className="w-3/6">
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
							<label htmlFor="Fornecedor" className="block">
								Descrição
							</label>
							<Textarea
								name="description"
								id="description"
								placeholder="Descrição"
								className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
							/>
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
