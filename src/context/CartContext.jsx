import { createContext, useContext } from 'react'

export const CartContext =
	createContext({
		items: [],
		setItems: () => [{}]
	})

export const useCart = () => useContext(CartContext)
