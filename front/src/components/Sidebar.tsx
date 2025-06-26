import { useAuth } from '@/contexts/AuthContext';
import { BiFolderPlus } from 'react-icons/bi';
import { FaUserFriends } from "react-icons/fa";
import { FaUser } from 'react-icons/fa6';
import { IoHome } from 'react-icons/io5';
import { MdBusinessCenter } from 'react-icons/md';
import { RxLayers } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import useMenuStore from '../store/toggleStore';


export function Sidebar() {
  const isOpen = useMenuStore((state) => state.isOpen);
  const { user } = useAuth();

  return (
    <section
    >
      <nav
        className={`${isOpen
          ? 'bg-violetPrimer w-[16rem] flex flex-col h-full  transition-all duration-200 ease-in-out'
          : 'bg-violetPrimer  w-[4.875rem] flex flex-col  h-full   transition-all duration-200 ease-in-out'
          }`}
      >
        <ul className="grid">
          <li className='text-zinc-50 hover:bg-violet-600 hover:text-zinc-800 p-4 transition-all duration-500'>
            <Link
              to={`/`}
              className="flex gap-4  font-medium mt-2 items-center
              "
            >
              <IoHome size={28} />
              <span className={`whitespace-nowrap overflow-hidden
        ${isOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
      `}>
                Home
              </span>
            </Link>
          </li>
          {user && user.role !== 'USER' && (
            <li className='text-zinc-50 hover:bg-violet-600 hover:text-zinc-800 p-4 transition-all duration-500'>
              <Link
                to={`/register`}
                className="flex gap-4 font-medium items-center"
              >
                <BiFolderPlus size={28} />
                <span className={`whitespace-nowrap overflow-hidden
        ${isOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
      `}>
                  Cadastro
                </span>
              </Link>
            </li>
          )}
          {user && user.role !== 'USER' && (
            <li className='text-zinc-50 hover:bg-violet-600 hover:text-zinc-800 p-4 transition-all duration-500'>
              <Link
                to={`/entry`}
                className="flex gap-4 font-medium items-center"
              >
                <MdBusinessCenter size={28} />
                <span className={`whitespace-nowrap overflow-hidden 
        ${isOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
      `}>Entrada</span>
              </Link>
            </li>)}

          <li className='text-zinc-50 hover:bg-violet-600 hover:text-zinc-800 p-4 transition-all duration-500'>
            <Link
              to={`/products`}
              className="flex gap-4 font-medium items-center"
            >
              <RxLayers size={28} />
              <span className={`whitespace-nowrap overflow-hidden
        ${isOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
      `}>filtro</span>
            </Link>
          </li>
          {user && user.role !== 'USER' && user.role !== 'EDITOR' && (
            <li className='text-zinc-50 hover:bg-violet-600 hover:text-zinc-800 p-4 transition-all duration-500'>
              <Link
                to={`/user`}
                className="flex gap-4 font-medium items-center"
              >
                <FaUser size={28} />
                <span className={`whitespace-nowrap overflow-hidden
        ${isOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
      `}>
                  Cadastro de usuário
                </span>
              </Link>
            </li>
          )}
          {user && user.role !== 'USER' && user.role !== 'EDITOR' && (
            <li className='text-zinc-50 hover:bg-violet-600 hover:text-zinc-800 p-4 transition-all duration-500'>
              <Link
                to={`/admin-users`}
                className="flex gap-4 font-medium items-center w-full"
              >
                <FaUserFriends size={28} />
                <span className={`whitespace-nowrap overflow-hidden
        ${isOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
      `}>
                  Usuários
                </span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

    </section >
  );
}
