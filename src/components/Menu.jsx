import React from 'react'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'

const Navbar = props => {
  return (
    <div className='menu'>
      <MenuItem to='/shop/new' className='menu-item'>
        Новинки
      </MenuItem>

      <MenuItem
        to='/shop/jewelry'
        className='menu-item'
        dropdown={
          <div className='menu-item-dropdown'>
            <Link to='/shop/pendants'>Подвески</Link>
            <Link to='/shop/rings'>Кольца</Link>
            <Link to='/shop/earrings'>Серьги</Link>
            <Link to='/shop/bracelets'>Браслеты</Link>
            <Link to='/shop/accessories'>Аксессуары</Link>
          </div>
        }
      >
        Украшения
      </MenuItem>
      <MenuItem
        to='/shop/kimono'
        className='menu-item'
        dropdown={
          <div className='menu-item-dropdown'>
            <Link to='/shop/kimono-men'>Мужские</Link>
            <Link to='/shop/kimono-women'>Женские</Link>
            <Link to='/shop/kimono-constructor'>Конструктор</Link>
          </div>
        }
      >
        Кимоно
      </MenuItem>
      <MenuItem to='/shop/discount' className='menu-item'>
        Скидки
      </MenuItem>
      <MenuItem to='/delivery' className='menu-item'>
        Доставка
      </MenuItem>
      <MenuItem to='/about' className='menu-item'>
        О нас
      </MenuItem>
    </div>
  )
}

export default Navbar
