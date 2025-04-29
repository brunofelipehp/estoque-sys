import { Link } from "react-router-dom";

export const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-violetPrimer">403 - Não autorizado</h1>
      <p className="mt-4 text-lg">Você não tem permissão para acessar esta página.</p>
      <Link to="/">Voltar para a  <strong className="text-violetPrimer ">➔ Home</strong> </Link>
    </div>
  );
}