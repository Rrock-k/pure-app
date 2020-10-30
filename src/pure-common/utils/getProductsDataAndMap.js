import { getShopItems } from './apiQueries'

export default async function getProductsDataAndMap() {
  const shopItems = await getShopItems()

  return shopItems
}
