import { FormProduct } from "@/components/FormPoduct";
import {
  type ProductSchema,
  createProductSchema,
} from "@/schemas/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const Register = () => {
  const methods = useForm<ProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  return (
    <>
      <Header />
      <div className="flex  bg-zinc-50">
        <Sidebar />
        <FormProvider {...methods}>
          <FormProduct />
        </FormProvider>
      </div>
    </>
  );
};
