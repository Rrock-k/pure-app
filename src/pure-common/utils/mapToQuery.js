export const whatToShowList = {
  kimono: { category: 'kimono' },
  'kimono-men': { types: 'kimono-men' },
  'kimono-women': { types: 'kimono-women' },
  'kimono-linen': { types: 'kimono-linen' },
  'kimono-silk': { types: 'kimono-silk' },
  'kimono-rayon': { types: 'kimono-rayon' },
  'kimono-cotton': { types: 'kimono-cotton' },
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
  deleted: { deletedAt: { $ne: null } },
  draft: { draftCreatedAt: { $ne: null } },

  isPublished: { isPublished: true },
  notPublished: { isPublished: false },
}

export function mapToQuery(queryKey) {
  if (!queryKey) return {}

  const queries = whatToShowList[queryKey]

  return queries || { category: 'undefined' }
}
