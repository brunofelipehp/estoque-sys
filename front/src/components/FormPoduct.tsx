import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useFetchPostProduct } from '@/hooks/useProducts';

import { useImagePreview } from '@/hooks/useImagePreview';
import { type ProductSchema } from '@/schemas/ProductSchema';
import { useFormContext } from 'react-hook-form';
import { IoMdCloudUpload } from 'react-icons/io';

export const FormProduct = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useFormContext<ProductSchema>();

  const { handleImageChange, previewImage, setPreviewImage } = useImagePreview();

  const { mutateAsync: fetchProduct } = useFetchPostProduct();

  const onSubmit = async (data: ProductSchema) => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("color", data.color);
    formData.append("size", data.size || '');
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("supplier", data.supplier)
    formData.append("image", data.image);

    await fetchProduct(formData);
    reset();
    setPreviewImage('')
  };

  return (
    <div className="flex justify-center mt-24 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/6 flex flex-col gap-4 mb-20"
        encType="multipart/form-data"
      >
        <h2 className=" text-4xl font-bold">Cadastro de Produto</h2>

        <div className="max-h-fit max-w-fit">
          <label
            htmlFor="input-image"
            className="w-[600px] h-[250px] aspect-[16/9] flex items-center  rounded-sm   justify-center border-[2px] border-dashed border-zinc-400  hover:border-violetPrimer cursor-pointer text-zinc-400 hover:text-violetPrimer transition-all ease-in-out duration-300"
          >
            <span className="h-full w-full flex justify-center">
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
            {...register('image')}
            onChange={handleImageChange}
          />
          {errors.image && (<span className='text-red-500 text-sm'>{errors.image.message}</span>)}
        </div>
        <div>
          <label className="block" htmlFor='name'>Nome</label>
          <Input
            type="text"
            id='name'
            className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
            placeholder="Nome do produto"
            {...register('name')}
          />
          {errors.name && (<span className='text-red-500 text-sm'>{errors.name.message}</span>)}
        </div>

        <div>
          <label className="block" htmlFor='name'>Cor</label>
          <Input
            type="text"
            id='name'
            className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
            placeholder="Cor"
            {...register('color')}
          />
          {errors.color && (<span className='text-red-500 text-sm'>{errors.color.message}</span>)}
        </div>

        <div>
          <label className="block" htmlFor='category'>Categoria</label>
          <Input
            type="text"
            id='category'
            className="border border-zinc-300 w-2/3 p-4 rounded outline-indigo-400"
            placeholder="Categoria"
            {...register('category')}
          />
          {errors.category && (<span className='text-red-500 text-sm'>{errors.category.message}</span>)}
        </div>

        <div>
          <label className="block" htmlFor='category'>Tamanho</label>
          <Input
            type="text"
            id='category'
            className="border border-zinc-300 w-2/3 p-4 rounded outline-indigo-400"
            placeholder="Tamanho"
            {...register('size')}
          />
          {errors.size && (<span className='text-red-500 text-sm'>{errors.size.message}</span>)}
        </div>

        <div>
          <label className="block" htmlFor='supplier'>Fornecedor</label>
          <Input
            type="text"
            id='supplier'
            className="border border-zinc-300 w-3/4 p-4 rounded outline-indigo-400"
            placeholder="Fornecedor"
            {...register('supplier')}
          />
          {errors.supplier && (<span className='text-red-500 text-sm'>{errors.supplier.message}</span>)}
        </div>

        <div>
          <label className="block" htmlFor='description'>Descrição</label>
          <Textarea
            id="description"
            placeholder="Descrição"
            className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
            {...register('description')}
          />
          {errors.description && (<span className='text-red-500 text-sm'>{errors.description.message}</span>)}
        </div>

        <Button type="submit" className="w-36  p-3 rounded-lg  text-white">
          Enviar
        </Button>
      </form>
    </div>
  );
};
