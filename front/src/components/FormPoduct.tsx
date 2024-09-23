import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useFetchPostProduct } from "@/hooks/useProducts";

import { useImagePreview } from "@/hooks/useImagePreview";
import type { ProductSchema } from "@/schemas/ProductSchema";
import { useFormContext } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

export const FormProduct = () => {
	//const [previewImage, setPreviewImage] = useState<string | null>(null);

	// const { register, handleSubmit, setValue } = useForm<ProductSchema>({
	// 	resolver: zodResolver(createProductSchema),
	// });
	const { register, handleSubmit, reset } = useFormContext<ProductSchema>();

	const { handleImageChange, previewImage } = useImagePreview();

	const { mutateAsync: fetchProduct } = useFetchPostProduct();

	const onSubmit = async (data: ProductSchema) => {
		const id = uuidv4();

		const imageUrl = `/uploads/${data.image}`;

		const { name, supplier, category, description } = data;

		const newProduct = {
			id,
			name,
			supplier,
			category,
			description,
			image: imageUrl,
		};

		await fetchProduct(newProduct);

		reset()
	};

	return (
		<div className="flex justify-center mt-24 w-full">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-3/6 flex flex-col gap-4 mb-20"
			>
				<h2 className="text-center text-4xl font-bold">Cadastro de Produto</h2>

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
						id="input-image"
						className="hidden"
						{...register("image")}
						onChange={handleImageChange}
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
	);
};
