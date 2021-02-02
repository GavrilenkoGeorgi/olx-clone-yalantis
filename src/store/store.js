import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas/rootSaga'

import productsReducer from './products/productsSlice'
import cartReducer from './cart/cartSlice'
import notificationsReducer from './notifications/notificationsSlice'
import ordersReducer from './orders/ordersSlice'

export const configureAppStore = (initialState = {}) => {
	const sagaMiddleware = createSagaMiddleware()

	const store = configureStore({
		reducer: {
			products: productsReducer,
			cart: cartReducer,
			notifications: notificationsReducer,
			orders: ordersReducer
		},
		initialState,
		middleware: [ ...getDefaultMiddleware({ thunk: false }), sagaMiddleware ],
		preloadedState: initialState,
		devTools: process.env.NODE_ENV !== 'production'
	})

	sagaMiddleware.run(rootSaga)

	return { store }
}

