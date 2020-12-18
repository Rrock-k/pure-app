const menuItems = [
  { href: 'new', name: 'новинки' },
  {
    href: 'jewelry',
    name: 'украшения',
    submenu: [
      { href: 'pendants', name: 'подвески' },
      { href: 'rings', name: 'кольца' },
      { href: 'earrings', name: 'серьги' },
      { href: 'jewelry-sets', name: 'комплекты' },
    ],
  },
  {
    href: 'kimono',
    name: 'кимоно',
    submenu: [
      { href: 'kimono-women', name: 'женские' },
      { href: 'kimono-men', name: 'мужские' },
      { href: 'kimono-linen', name: 'лён' },
      { href: 'kimono-silk', name: 'шёлк' },
      { href: 'kimono-rayon', name: 'район' },
      { href: 'kimono-cotton', name: 'хлопок' },
    ],
  },
  { href: 'clothing', name: 'одежда' },
  { href: 'accessories', name: 'аксессуары' },
]

export default menuItems
