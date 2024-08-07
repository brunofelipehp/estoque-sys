import { MdBusinessCenter } from "react-icons/md";
import { RxLayers } from "react-icons/rx";
import useMenuStore from "../store/toggleStore";
import { BiFolderPlus } from "react-icons/bi";

export const Sidebar = () => {
  const isOpen = useMenuStore((state) => state.isOpen);

  return (
    <section
      className={`${
        isOpen
          ? "bg-indigo-400 h-screen w-[13rem] flex flex-col absolute z-50 gap-7 transition-all duration-200 ease-in-out"
          : "bg-indigo-400 h-screen w-[4.875rem] flex flex-col  gap-7 transition-all duration-200 ease-in-out"
      }`}
    >
      <ul className="grid ml-5 gap-4">
        <li className=" text-zinc-50 font-medium mt-5">
          <a href="/register" className="flex gap-4">
            <BiFolderPlus size={32} />
            <span className={`${!isOpen ? "hidden" : "visible"}`}>
              Cadastro
            </span>
          </a>
        </li>
        <li className="flex gap-4 text-zinc-50 font-medium ">
          <MdBusinessCenter size={32} />
          <span className={`${!isOpen ? "hidden" : "visible"}`}>Entrada</span>
        </li>
        <li className="flex gap-4 text-zinc-50 font-medium">
          <RxLayers size={32} />
          <span className={`${!isOpen ? "hidden" : "visible"}`}>saida</span>
        </li>
      </ul>
    </section>
  );
};
