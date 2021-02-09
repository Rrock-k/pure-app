import React from 'react'

import { HoverContext } from 'pure-common/components/HoverContext'
import { ProductsContext } from 'pure-common/components/ProductsContext'

import { CartContext } from 'contexts/contexts/CartContext'
import { LanguageContext } from 'contexts/contexts/LanguageContext'

export default function Providers({ children }) {
  return (
    <HoverContext>
      <LanguageContext>
        <ProductsContext>
          <CartContext>{children}</CartContext>
        </ProductsContext>
      </LanguageContext>
    </HoverContext>
  )
}
