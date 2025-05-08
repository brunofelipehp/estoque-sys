import { UserProps } from "@/schemas/UserSchema";
import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createUser = async (data: UserProps) => {
 try {
   await api.post('/user', data);
 } catch {
  console.error('Error creating user:');
  
 }
}

const findAllUsers = async () => {
  try {
    const response = await api.get('/users');

    return response.data
  } catch {
    console.error('Error fetching users:');
    
  }
}

const findUserById = async (id: string) => {
 try {
  const response = await api.get(`/user/${id}`)

  return response.data

 } catch  {
  console.error('Error fetching users:');
 }
}

export const useUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserProps) => createUser(data),
    onMutate: () => {
      toast.loading('Criando usuário...');
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success('Usuário criado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.dismiss();
      toast.error('Erro ao criar usuário');
    }
  
  })
}

export const useFindAllUsers = () => {
  const {data: users, isLoading} = useQuery({queryKey: ['users'], queryFn: () => findAllUsers()})

  return {users, isLoading}
}

export const useFindUserById = (id: string) => {
  const {data: user} = useQuery({
    queryKey: ['user', id],
    queryFn: () => findUserById(id),
    enabled: !!id, // Ensures the query only runs if id is provided
  });

  return {user};
}