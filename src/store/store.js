import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './products/productsSlice'
import cartReducer from './cart/cartSlice'

export default configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer
	}
})
