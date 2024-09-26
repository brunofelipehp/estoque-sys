import { Controller, useForm } from "react-hook-form";

import { useFetchProductById, useFetchProducts } from "@/hooks/useProducts";
import { useFetchStockEntry } from "@/hooks/useStockEntries";

import Select from "react-select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from "@/components/ui/select";

import type {
  SchemaStockEntry,
  stockEntriesProps,
} from "@/schemas/StockEntrySchema";

import { v4 as uuidv4 } from "uuid";

export const FormStockEntry = () => {
  const { control, handleSubmit, setValue, register, reset } =
    useForm<SchemaStockEntry>();

  const { data } = useFetchProducts();
  const { mutateAsync: StockEntryById } = useFetchProductById();

  const { mutateAsync: postStockEntry } = useFetchStockEntry();

  const onSubmit = async (data: SchemaStockEntry) => {
    const productId = data.name.value;

    const stockEntryId = uuidv4();

    const productSelected = await StockEntryById(productId);

    if (productSelected) {
      const { category, supplier } = productSelected;

      const productEntry: stockEntriesProps = {
        id: stockEntryId,
        productId,
        productName: data.name.label,
        category,
        supplier,
        costPrice: data.costPrice,
        salePrice: data.salePrice,
        quantity: data.quantity,
        type: data.type,
      };

      await postStockEntry(productEntry);

      reset();
    }
  };

  return (
    <div className="flex justify-center mt-24 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/6 flex flex-col gap-4"
      >
        <h2 className="text-center text-4xl font-bold">Entrada e Saída</h2>

        <Controller
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={data}
              placeholder="selecione um produto"
            />
          )}
          {...register("name")}
        />

        <div className="grid grid-cols-2 w-full gap-2 items-center">
          <div className="">
            <label htmlFor="nome" className="block">
              Preço de custo
            </label>
            <Input
              type="number"
              className="border border-zinc-300 w-full  p-4 rounded outline-indigo-400"
              placeholder=""
              {...register("costPrice")}
            />
          </div>
          <div className="">
            <label htmlFor="nome" className="block">
              Preço de venda
            </label>
            <Input
              type="number"
              className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
              {...register("salePrice")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Quantidade</label>
          <Input
            type="number"
            id="quanty"
            className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
            {...register("quantity")}
          />
        </div>
        <div>
          <label htmlFor="">Entrada ou Saída</label>

          <ShadcnSelect
            onValueChange={(value: "Entrada" | "Saída") =>
              setValue("type", value)
            }
            {...register("type")}
          >
            <SelectTrigger className="border border-zinc-300 w-full p-4 rounded outline-indigo-400 mb-4">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Entrada">Entrada</SelectItem>
              <SelectItem value="Saída">Saída</SelectItem>
            </SelectContent>
          </ShadcnSelect>
        </div>
        <Button type="submit" className="w-36  p-3 rounded-lg  text-white">
          Enviar
        </Button>
      </form>
    </div>
  );
};
