export const formatPrice = (price: string | number, currency = 'RUB') => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol',
    currency
  }).format(+price);
}