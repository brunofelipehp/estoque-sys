import { useCurrencyFormat } from '@/hooks/useCurrencyFormart';
import { useMovementOfProduct } from '@/hooks/useFilterProductTable';
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from 'react-icons/fa6';
import { MdOutlineWallet } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Dashboard() {

  const page = 1
  //const limit = 5;

  const { profit, expenses, totalProfit } = useMovementOfProduct(page);

  const { formatCurrencyBrl } = useCurrencyFormat()


  return (

    <div className="flex justify-center mt-24 gap-4 ">
      <Card className="w-60 h-40">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-bold text-xl">Entrada</CardTitle>
            <FaMoneyBillTrendUp size={24} color="red" />
          </div>
        </CardHeader>
        <CardContent className="flex gap-2">

          <span>{formatCurrencyBrl(expenses)}</span>
        </CardContent>
      </Card>

      <Card className="w-60 h-40">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-bold text-xl">Saída</CardTitle>
            <FaMoneyBillTransfer size={24} color="green" />
          </div>
        </CardHeader>
        <CardContent className="flex gap-2">

          <span>{formatCurrencyBrl(profit)}</span>
        </CardContent>
      </Card>
      <Card className="w-60 h-40">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-bold text-xl">Total Receita</CardTitle>
            <MdOutlineWallet size={24} color="6d28d9" />
          </div>
        </CardHeader>
        <CardContent className="flex gap-2">

          <span>{formatCurrencyBrl(totalProfit)}</span>
        </CardContent>
      </Card>
    </div>
  );
}
