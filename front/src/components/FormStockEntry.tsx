import { Controller, useForm } from 'react-hook-form';

import { useFetchProducts } from '@/hooks/useProducts';
import { useFetchStockMovement } from '@/hooks/useStockEntries';

import Select from 'react-select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from '@/components/ui/select';

import {
  stockEntryFormSchema,
  type SchemaStockEntry,
  type stockEntriesProps
} from '@/schemas/StockEntrySchema';

import { stylesFormSelectProduct } from '@/lib/StylesFormSelect';
import { zodResolver } from '@hookform/resolvers/zod';


export const FormStockEntry = () => {
  const { control, handleSubmit, setValue, register, reset, watch, formState: { errors } } =
    useForm<SchemaStockEntry>({
      resolver: zodResolver(stockEntryFormSchema),
      defaultValues: {
        name: { value: '', label: 'Selecione o produto...' },
        price: 0,
        quantity: 0,
        type: undefined,
      },
    });

  const { data: productSelect } = useFetchProducts();
  const { mutateAsync: postStockEntry } = useFetchStockMovement();


  const onSubmit = async (data: SchemaStockEntry) => {

    const productId = data.name.value;

    if (productId) {

      const type = watch('type')


      const productEntry: stockEntriesProps = {
        productId,
        price: data.price,
        quantity: data.quantity,
        type,
      };

      try {
        await postStockEntry(productEntry);
      } catch (error) {
        console.error("Error ao cadastrar movimentação de estoque");
      }
      reset();

    }
  };

  return (
    <div className="flex justify-center  mt-24 w-full h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/6 flex flex-col gap-4"
      >
        <h2 className="text-center text-4xl font-bold">Entrada e Saída</h2>

        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <Select
              {...field}
              options={productSelect}
              placeholder="selecione um produto"
              styles={stylesFormSelectProduct}
            />
          )}

        />

        {errors.name?.value && (<span className='text-red-500 text-sm'>{errors.name.value.message}</span>)}



        <div className="grid grid-cols-2 w-full gap-2 ">
          <div className="">
            <label htmlFor="cost" className="block">
              Preço
            </label>
            <Input
              type="number"
              id='cost'
              className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
              placeholder=""
              {...register('price', { valueAsNumber: true })}
              defaultValue={0}
            />
            {errors.price && (<span className='text-red-500 text-sm'>{errors.price.message}</span>)}
          </div>

          <div className="">
            <div>
              <label htmlFor="quantity">Quantidade</label>
              <Input
                type="number"
                id="quantity"
                className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
                {...register('quantity', { valueAsNumber: true })}
                defaultValue={0}
              />
              {errors.quantity && (<span className='text-red-500 text-sm'>{errors.quantity.message}</span>)}
            </div>
          </div>
        </div>
        <div>
          <label>Entrada ou Saída</label>

          <ShadcnSelect
            value={watch('type') || ''}
            onValueChange={(value: 'IN' | 'OUT') =>
              setValue('type', value)
            }
          >
            <SelectTrigger className="border border-zinc-300 w-full p-4 rounded outline-indigo-400 mb-4">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IN">Entrada</SelectItem>
              <SelectItem value="OUT">Saída</SelectItem>
            </SelectContent>
          </ShadcnSelect>
          {errors.type && (<span className='text-red-500 text-sm'>{errors.type.message}</span>)}
        </div>
        <Button type="submit" className="w-36  p-3 rounded-lg  text-white">
          Enviar
        </Button>
      </form>
    </div>
  );
};
