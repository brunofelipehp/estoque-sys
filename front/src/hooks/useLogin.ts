import { useAuth } from "@/contexts/AuthContext"
import { LoginSchema } from "@/schemas/LoginSchema"
import api from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const fetchLogin = async (data: LoginSchema) => {
  const response = await api.post('/login', data)
  
  return response.data
}

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login } = useAuth()

  return useMutation({
    mutationFn: (data: LoginSchema) => fetchLogin(data),
    onMutate: () => {
      toast.loading('Fazendo login...');
    },
    onSuccess: (data) => {
     
      toast.dismiss();
      toast.success('Login realizado com sucesso:', );
      queryClient.invalidateQueries({ queryKey: ['loginUser'] })
      const { token } = data
     login(token)
      navigate('/')
    },
    onError: () => {
      toast.dismiss();
      toast.error('Erro ao fazer login:');
    }
  }) 
}