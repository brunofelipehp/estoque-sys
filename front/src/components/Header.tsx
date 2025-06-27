import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from "react-icons/io5";

import useMenuStore from '../store/toggleStore';
import logo from './../assets/1.svg';
import { UserMenu } from './UserMenu';

export function Header() {
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const isOpen = useMenuStore((state) => state.isOpen);

  return (
    <div className="flex justify-between items-center bg-zinc-800 w-full p-1 text-zinc-50">
      <div className="bg-zinc-800 w-full p-1 text-zinc-50 flex gap-32 items-center">
        <h1 className="text-3xl font-bold">
          <a href="/"> <img
            src={logo}
            alt="Image"
            className="h-14 w-20  "
          /></a>
        </h1>
        <div className="grid justify-center p-2 cursor-pointer">
          {
            isOpen ? <IoCloseSharp size={24} onClick={toggleMenu} className='transition-all duration-500 opacity-100 hover:text-violetPrimer' /> : <GiHamburgerMenu size={24} onClick={toggleMenu} className='transition-all duration-500 opacity-100 hover:text-violetPrimer' />

          }

        </div>
      </div>
      <UserMenu />
    </div>
  );
}
