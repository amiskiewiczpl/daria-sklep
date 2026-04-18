import { useState, useEffect } from 'react'
import { CartItem, Product } from '../types'

const CART_STORAGE_KEY = 'rosna-cart'

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart))
  }

  const addToCart = (product: Product, quantity: number, selectedSize: string, selectedColor: string) => {
    const newCart = [...cart]
    const existingItem = newCart.find(
      item => item.product.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
    )
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      newCart.push({ product, quantity, selectedSize, selectedColor })
    }
    saveCart(newCart)
  }

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index)
    saveCart(newCart)
  }

  const clearCart = () => {
    saveCart([])
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
  }
}