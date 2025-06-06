export const useCurrencyFormat = () => {

  const formatCurrencyBrl = (valueCurrency: number | string) => {
    const parsedValue = typeof valueCurrency === 'string' ? parseFloat(valueCurrency) : valueCurrency;

    if(isNaN(parsedValue)) return 'R$ 0,00'

   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parsedValue)
  }

  return {formatCurrencyBrl}

}