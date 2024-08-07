import { Header } from "../components/Header";

import { Sidebar } from "../components/Sidebar";

export const Register = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen  bg-zinc-50">
        <Sidebar />
        <div className="flex justify-center mt-24 w-full">
          <form action="" className="w-3/6 flex flex-col gap-4">
            <h2 className="text-center text-4xl font-bold">
              Cadastro de Produto
            </h2>
            <div>
              <label htmlFor="nome" className="block">
                Nome
              </label>
              <input
                type="text"
                className="border border-zinc-300 w-full p-2 rounded outline-indigo-400"
                placeholder="Nome do produto"
              />
            </div>
            <div>
              <label htmlFor="categoria" className="block">
                Categoria
              </label>
              <input
                type="text"
                className="border border-zinc-300 w-full p-2 rounded outline-indigo-400"
                placeholder="Categoria"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-3/6">
                <label htmlFor="nome" className="block">
                  Preço de custo
                </label>
                <input
                  type="number"
                  className="border border-zinc-300 w-full  p-2 rounded outline-indigo-400"
                  placeholder=""
                />
              </div>
              <div className="w-3/6">
                <label htmlFor="nome" className="block">
                  Preço de venda
                </label>
                <input
                  type="number"
                  className="border border-zinc-300 w-full p-2 rounded outline-indigo-400"
                />
              </div>
            </div>
            <div>
              <label htmlFor="categoria" className="block">
                Fornecedor
              </label>
              <input
                type="text"
                className="border border-zinc-300 w-full p-2 rounded outline-indigo-400"
                placeholder="Categoria"
              />
            </div>
            <div>
              <label htmlFor="Fornecedor" className="block">
                Descrição
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Descrição"
                className="border border-zinc-300 w-full p-2 rounded outline-indigo-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-36  p-3 rounded-lg bg-green-700 text-white"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
