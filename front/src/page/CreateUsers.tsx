import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUsers } from "@/hooks/useUsers";
import { UserProps, userSchema } from "@/schemas/UserSchema";
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from "react-hook-form";

export const CreateUsers = () => {
  const { handleSubmit, setValue, register, reset, watch, formState: { errors } } =
    useForm<UserProps>({
      resolver: zodResolver(userSchema),
      defaultValues: {
        name: '',
        email: '',
        password: '',
        role: undefined,
      },
    });

  const { mutateAsync: createUser } = useUsers();

  const onSubmit = async (data: UserProps) => {

    const role = watch('role')

    const userData: UserProps = {
      ...data,
      role,
    }

    await createUser(userData);
    reset();

  }

  return (
    <>
      <Header />
      <div className="flex  bg-zinc-50 h-screen">
        <Sidebar />
        <div className="flex justify-center mt-24 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-3/6 flex flex-col gap-4 mb-20"

          >
            <h2 className=" text-4xl font-bold text-center">Cadastro de usuário</h2>

            <div className="max-h-fit max-w-fit">
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
              <label className="block" htmlFor='email'>email</label>
              <Input
                type="email"
                id='email'
                className="border border-zinc-300 w-full p-4 rounded outline-indigo-400"
                placeholder="email"
                {...register('email')}
              />
              {errors.email && (<span className='text-red-500 text-sm'>{errors.email.message}</span>)}
            </div>

            <div>
              <label className="block" htmlFor='password'>senha</label>
              <Input
                type="text"
                id='password'
                className="border border-zinc-300 w-2/3 p-4 rounded outline-indigo-400"
                placeholder="senha"
                {...register('password')}
              />
              {errors.password && (<span className='text-red-500 text-sm'>{errors.password.message}</span>)}
            </div>

            <div>
              <label>Selecione nível</label>

              <Select
                value={watch('role') || ''}
                onValueChange={(value: 'ADMIN' | 'EDITOR' | 'USER') =>
                  setValue('role', value)
                }
              >
                <SelectTrigger className="border border-zinc-300 w-2/3 p-4 rounded outline-indigo-400 mb-4">
                  <SelectValue placeholder="nível de acesso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  <SelectItem value="USER">user</SelectItem>
                </SelectContent>
              </Select>
            </div>


            <Button type="submit" className="w-36  p-3 rounded-lg  text-white">
              Enviar
            </Button>
          </form >
        </div >
      </div>
    </>
  )
}