import { useLogin } from "@/hooks/useLogin";
import { LoginSchema, loginUserSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const FormLogin = () => {
  const { handleSubmit, register } = useForm<LoginSchema>({
    resolver: zodResolver(loginUserSchema),
  },
  )

  const { mutateAsync: loginUser } = useLogin();



  const onSubmit = async (data: LoginSchema) => {
    //const { email, password } = data;

    await loginUser(data)

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800">
      <h1 className="text-4xl font-bold mb-4 text-zinc-100">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded  w-96">
        <div className="mb-4">
          <Label htmlFor="username" className="block text-sm font-medium text-zinc-100">Email</Label>
          <Input type="email" id="username" className="mt-1 block w-96  rounded-md p-2 text-gray-100" required placeholder="mail@example.com"  {...register('email')} />
        </div>
        <div className="mb-4">
          <Label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</Label>
          <Input type="password" id="password" className="mt-1 block w-96  rounded-md p-2 text-gray-100" required {...register('password')} />
        </div>
        <Button type="submit" className="w-96  p-3 rounded-lg  text-white">
          Entrar
        </Button>
      </form>
    </div>
  )
}