import { BiFolderPlus } from 'react-icons/bi';
import { MdBusinessCenter } from 'react-icons/md';
import { RxLayers } from 'react-icons/rx';
import useMenuStore from '../store/toggleStore';

export function Sidebar() {
  const isOpen = useMenuStore((state) => state.isOpen);

  return (
    <section
      className={`${
        isOpen
          ? 'bg-violetPrimer w-[13rem] flex flex-col  z-50 gap-7 transition-all duration-200 ease-in-out'
          : 'bg-violetPrimer  w-[4.875rem] flex flex-col  gap-7 transition-all duration-200 ease-in-out'
      }`}
    >
      <ul className="grid ml-5 gap-4">
        <li>
          <a
            href="/register"
            className="flex gap-4 text-zinc-50 font-medium mt-5 items-center"
          >
            <BiFolderPlus size={32} />
            <span className={`${!isOpen ? 'hidden' : 'visible'}`}>
              Cadastro
            </span>
          </a>
        </li>
        <li>
          <a
            href="/entry"
            className="flex gap-4 text-zinc-50 font-medium items-center"
          >
            <MdBusinessCenter size={32} />
            <span className={`${!isOpen ? 'hidden' : 'visible'}`}>Entrada</span>
          </a>
        </li>
        <li className="flex gap-4 text-zinc-50 font-medium items-center">
          <a
            href="/products"
            className="flex gap-4 text-zinc-50 font-medium items-center"
          >
            <RxLayers size={32} />
            <span className={`${!isOpen ? 'hidden' : 'visible'}`}>filtro</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
