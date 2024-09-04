import { Button } from "@/components/ui/button";
import { Header } from "../components/Header";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { Sidebar } from "../components/Sidebar";

export const Register = () => {
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [name, setName] = useState<string>("")

	const handleFormRegister = (event: React.FormEvent) => {
 
		event.preventDefault()
		const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
		const nameValue = formData.get('name') as string
			setName(nameValue)
			console.log(name);
	}



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
			<div className="flex  bg-zinc-50">
				<Sidebar />
				<div className="flex justify-center mt-24 w-full">
					<form onSubmit={handleFormRegister} className="w-3/6 flex flex-col gap-4 mb-20">
						<h2 className="text-center text-4xl font-bold">
							Cadastro de Produto
						</h2>
						<div className="max-h-fit max-w-fit">
							<label
								htmlFor="input-image"
								className="w-[400px] aspect-[16/9] flex items-center  rounded-sm   justify-center border-[2px] border-dashed border-zinc-400  hover:border-violetPrimer cursor-pointer text-zinc-400 hover:text-violetPrimer transition-all ease-in-out duration-300"
							>
								<span className="">
									{previewImage ? (
										<img
											src={previewImage}
											alt="Preview"
											className="max-w-full max-h-full  filter brightness-75 items-center rounded-sm"
										/>
									) : (
										<div className="flex items-center gap-2 ">
											<span>Escolha uma imagem</span>
											<IoMdCloudUpload size={32} />
										</div>
									)}
								</span>
							</label>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								name="input-image"
								id="input-image"
								className="hidden"
							/>
						</div>

						<div>
							<label htmlFor="nome" className="block">
								Nome
							</label>
							<Input
								type="text"
								className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
								placeholder="Nome do produto"
								name="name"
								onChange={(e) => setName(e.target.value)}
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
