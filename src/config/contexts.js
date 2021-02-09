import { LanguageContext, useLanguageContext } from 'contexts/contexts/LanguageContext'
import { CartContext, useCartContext } from 'contexts/contexts/CartContext'
import { HoverContext, useHoverContext } from 'pure-common/components/HoverContext'
import { ProductsContext, useProductsContext } from 'pure-common/components/ProductsContext'
import {
  MobileMenuAndContext,
  useMobileMenuContext,
} from 'pure-common/components/MobileMenuAndContext'

export const contexts = {
  LanguageContext,
  useLanguageContext,

  HoverContext,
  useHoverContext,

  ProductsContext,
  useProductsContext,

  CartContext,
  useCartContext,

  MobileMenuAndContext,
  useMobileMenuContext,
}
