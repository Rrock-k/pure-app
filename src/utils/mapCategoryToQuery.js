export function mapCategoryToQuery(category) {
  const categoriesList = {
    kimono: { type: 'kimono' },
    'kimono-men': { subtype: 'kimono-men' },
    'kimono-women': { subtype: 'kimono-women' },
    jewelry: { type: 'jewelry' },
    pendants: { subtype: 'pendants' },
    earrings: { subtype: 'earrings' },
    rings: { subtype: 'rings' },
    bracelets: { subtype: 'bracelets' },
    new: { flagNew: true },
    accessories: { type: 'accessories' },
    discount: { flagDiscount: true },
    gifts: { tags: 'gifts' },
  }
  if (!category) return {}

  const queries = categoriesList[category]

  return queries || {type: 'undefined'}
}