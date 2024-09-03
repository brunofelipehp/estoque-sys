import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const Dashboard = () => {
	return (
		<div className="flex justify-center gap-4 ">
			<Card className="w-60 h-40">
				<CardHeader>
					<CardTitle>Entrada</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-2">
					<span>R$</span>
					<span>1.450,00</span>
				</CardContent>
			</Card>

			<Card className="w-60 h-40">
				<CardHeader>
					<CardTitle>Saída</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-2">
					<span>R$</span>
					<span>1.450,00</span>
				</CardContent>
			</Card>
			<Card className="w-60 h-40">
				<CardHeader>
					<CardTitle>Total Receita</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-2">
					<span>R$</span>
					<span>1.450,00</span>
				</CardContent>
			</Card>
		</div>
	);
};
