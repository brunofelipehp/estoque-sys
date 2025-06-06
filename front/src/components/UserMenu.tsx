import { useAuth } from "@/contexts/AuthContext";
import { useFindUserById } from "@/hooks/useUsers";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IoIosLogOut } from "react-icons/io";


export const UserMenu = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const userId = user ? user.id : '';
  const { user: userData } = useFindUserById(userId);

  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg mr-20">
        <div >
          <img className="rounded-lg w-34 h-14" src={`https://ui-avatars.com/api/?size=128&color=fff&background=6d28d9&name=${userData?.name}`} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-20 bg-zinc-800  border border-zinc-700 text-zinc-100 mt-4">
        <DropdownMenuLabel>
          <div className="flex items-center gap-4 px-2 ">
            <img className="rounded-lg w-34 h-10" src={`https://ui-avatars.com/api/?size=128&color=fff&background=6d28d9&name=${userData?.name}`} />
            <span className="font-normal line-clamp-1">{userData?.name}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-700" />
        <button
          onClick={handleLogout}
          className="bg-zinc-800 hover:bg-zinc-700 text-red-400 w-full flex items-center gap-4 text-sm font-bold p-4"
        >

          <IoIosLogOut size={24} />

          <p>Sair da conta</p>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}