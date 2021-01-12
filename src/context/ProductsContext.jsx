import { createContext, useContext } from 'react'

export const ProductsContext =
	createContext({
		products: []
	})

export const useProducts = () => useContext(ProductsContext)
