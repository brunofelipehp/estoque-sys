import { GiHamburgerMenu } from 'react-icons/gi';
import useMenuStore from '../store/toggleStore';
import { UserMenu } from './UserMenu';

export function Header() {
  const toggleMenu = useMenuStore((state) => state.toggleMenu);

  return (
    <div className="flex justify-between items-center bg-zinc-800 w-full p-1 text-zinc-50">
      <div className="bg-zinc-800 w-full p-4 text-zinc-50 flex gap-16 items-center">
        <h1 className="text-3xl font-bold">
          <a href="/">Estoque</a>
        </h1>
        <div className="grid justify-center p-2 cursor-pointer">
          <GiHamburgerMenu size={24} onClick={toggleMenu} />
        </div>
      </div>
      <UserMenu />
    </div>
  );
}
