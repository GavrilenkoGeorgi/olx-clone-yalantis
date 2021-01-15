import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './products/productsSlice'

export default configureStore({
	reducer: {
		products: productsReducer
	}
})
