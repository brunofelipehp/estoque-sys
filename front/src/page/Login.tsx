import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";
import { LoginSchema, loginUserSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const Login = () => {

  const { handleSubmit, register } = useForm<LoginSchema>({
    resolver: zodResolver(loginUserSchema),
  },
  )

  const { mutateAsync: loginUser } = useLogin();



  const onSubmit = async (data: LoginSchema) => {
    //const { email, password } = data;

    await loginUser(data)



  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96">
        <div className="mb-4">
          <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</Label>
          <Input type="email" id="username" className="mt-1 block w-full border rounded-md p-2" required  {...register('email')} />
        </div>
        <div className="mb-4">
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
          <Input type="password" id="password" className="mt-1 block w-full border rounded-md p-2" required {...register('password')} />
        </div>
        <Button type="submit" className="w-full  p-3 rounded-lg  text-white">
          Entrar
        </Button>
      </form>
    </div>
  );
}