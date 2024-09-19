import { FormProduct } from "@/components/FormPoduct";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const Register = () => {
	return (
		<>
			<Header />
			<div className="flex  bg-zinc-50">
				<Sidebar />
				<FormProduct />
			</div>
		</>
	);
};
