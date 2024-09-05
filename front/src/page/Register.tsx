import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "../components/Header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { Sidebar } from "../components/Sidebar";

const createRegisterSchema = z.object({
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
});

type SchemaRegister = z.infer<typeof createRegisterSchema>;

export const Register = () => {
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	//	const [name, setName] = useState<string>("");

	const { register, handleSubmit } = useForm<SchemaRegister>({
		resolver: zodResolver(createRegisterSchema),
	});

	const onSubmit = (data: SchemaRegister) => {
		console.log(data);
	};

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
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-3/6 flex flex-col gap-4 mb-20"
					>
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
							<label className="block">Nome</label>
							<Input
								type="text"
								className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
								placeholder="Nome do produto"
								{...register("name")}
							/>
						</div>
						<div>
							<label className="block">Fornecedor</label>
							<Input
								type="text"
								className="border border-zinc-300 w-3/4 p-4 rounded outline-indigo-400"
								placeholder="Fornecedor"
								{...register("supplier")}
							/>
						</div>
						<div>
							<label className="block">Categoria</label>
							<Input
								type="text"
								className="border border-zinc-300 w-2/3 p-4 rounded outline-indigo-400"
								placeholder="Categoria"
								{...register("category")}
							/>
						</div>
						<div className="flex gap-2">
							<div className="w-3/6">
								<label className="block">Preço de custo</label>
								<Input
									type="number"
									className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
									{...register("costPrice")}
								/>
							</div>
							<div className="w-3/6">
								<label className="block">Preço de venda</label>
								<Input
									type="number"
									className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
									{...register("salePrice")}
								/>
							</div>
						</div>

						<div>
							<label className="block">Descrição</label>
							<Textarea
								id="description"
								placeholder="Descrição"
								className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
								{...register("description")}
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
