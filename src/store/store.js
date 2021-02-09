import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './products/productsSlice'
import cartReducer from './cart/cartSlice'
import notificationsReducer from './notifications/notificationsSlice'
import ordersReducer from './orders/ordersSlice'

export default configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		notifications: notificationsReducer,
		orders: ordersReducer
	}
})
