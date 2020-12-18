export const whatToShowList = {
  kimono: { category: 'kimono' },
  'kimono-men': { types: 'kimono-men' },
  'kimono-women': { types: 'kimono-women' },
  'kimono-linen': { category: 'kimono', types: 'linen' },
  'kimono-silk': { category: 'kimono', types: 'silk' },
  'kimono-rayon': { category: 'kimono', types: 'rayon' },
  'kimono-cotton': { category: 'kimono', types: 'cotton' },
  clothing: { category: { $in: ['kimono', 'clothing'] } },
  jewelry: { category: 'jewelry' },
  pendants: { types: 'pendants' },
  earrings: { types: 'earrings' },
  rings: { types: 'rings' },
  bracelets: { types: 'bracelets' },
  accessories: { category: 'accessories' },
  new: { flagNew: true },
  discount: { flagDiscount: true },
  gifts: { tags: 'gifts' },

  isPublished: { isPublished: true },
  notPublished: { isPublished: false },
}

export function mapToQuery(queryKey) {
  if (!queryKey) return {}

  const queries = whatToShowList[queryKey]

  return queries || { category: 'undefined' }
}
