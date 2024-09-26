import { GiHamburgerMenu } from 'react-icons/gi';
import useMenuStore from '../store/toggleStore';

export function Header() {
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  return (
    <div className="bg-zinc-800 w-full p-4 text-zinc-50 flex gap-12 items-center">
      <h1 className="text-3xl font-bold">
        <a href="/">Estoque</a>
      </h1>
      <div className="grid justify-center p-2 cursor-pointer">
        <GiHamburgerMenu size={24} onClick={toggleMenu} />
      </div>
    </div>
  );
}
