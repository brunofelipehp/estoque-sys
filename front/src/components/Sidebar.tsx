import { BiFolderPlus } from 'react-icons/bi';
import { IoHome } from 'react-icons/io5';
import { MdBusinessCenter } from 'react-icons/md';
import { RxLayers } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import useMenuStore from '../store/toggleStore';

export function Sidebar() {
  const isOpen = useMenuStore((state) => state.isOpen);

  return (
    <section
    >
      <nav
        className={`${isOpen
          ? 'bg-violetPrimer w-[13rem] flex flex-col h-screen  gap-7 transition-all duration-200 ease-in-out'
          : 'bg-violetPrimer  w-[4.875rem] flex flex-col  h-screen  gap-7 transition-all duration-200 ease-in-out'
          }`}
      >
        <ul className="grid ml-5 gap-4">
          <li>
            <Link
              to={`/`}
              className="flex gap-4 text-zinc-50 font-medium mt-5 items-center"
            >
              <IoHome size={32} />
              <span className={`${!isOpen ? 'hidden' : 'visible'}`}>
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={`/register`}
              className="flex gap-4 text-zinc-50 font-medium items-center"
            >
              <BiFolderPlus size={32} />
              <span className={`${!isOpen ? 'hidden' : 'visible'}`}>
                Cadastro
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={`/entry`}
              className="flex gap-4 text-zinc-50 font-medium items-center"
            >
              <MdBusinessCenter size={32} />
              <span className={`${!isOpen ? 'hidden' : 'visible'}`}>Entrada</span>
            </Link>
          </li>
          <li className="flex gap-4 text-zinc-50 font-medium items-center">
            <Link
              to={`/products`}
              className="flex gap-4 text-zinc-50 font-medium items-center"
            >
              <RxLayers size={32} />
              <span className={`${!isOpen ? 'hidden' : 'visible'}`}>filtro</span>
            </Link>
          </li>
        </ul>
      </nav>

    </section>
  );
}
