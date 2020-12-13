export default function getPriceStr(price, lang) {
  let result = ''
  if (lang === 'ru') result += price + ' ₽'
  if (lang === 'en') result += '$' + price
  return result
}
