import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MdOutlineWallet } from "react-icons/md";

export const Dashboard = () => {
	return (
		<div className="flex justify-center mt-24 gap-4 ">
			<Card className="w-60 h-40">
				<CardHeader >
				<div className="flex justify-between items-center">
				<CardTitle className="font-bold text-xl">Entrada</CardTitle>
				<FaMoneyBillTrendUp size={24} color="red"/>
				</div>

				</CardHeader>
				<CardContent className="flex gap-2">
					<span>R$</span>
					<span>1.450,00</span>
				</CardContent>
			</Card>

			<Card className="w-60 h-40">
				<CardHeader>
				<div className="flex justify-between items-center">
				<CardTitle className="font-bold text-xl">Saída</CardTitle>
				<FaMoneyBillTransfer size={24} color="green"/>
				</div>

				</CardHeader>
				<CardContent className="flex gap-2">
					<span>R$</span>
					<span>1.450,00</span>
				</CardContent>
			</Card>
			<Card className="w-60 h-40">
				<CardHeader>
				
					<div className="flex justify-between items-center">
					<CardTitle className="font-bold text-xl">Total Receita</CardTitle>
				<MdOutlineWallet  size={24} color="6d28d9"/>
				</div>
				</CardHeader>
				<CardContent className="flex gap-2">
					<span>R$</span>
					<span>1.450,00</span>
				</CardContent>
			</Card>
		</div>
	);
};