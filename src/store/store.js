import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas/rootSaga'

import productsReducer from './products/productsSlice'
import cartReducer from './cart/cartSlice'
import notificationsReducer from './notifications/notificationsSlice'
import ordersReducer from './orders/ordersSlice'

function createSagaInjector(runSaga, rootSaga) {
	const injectedSagas = new Map()
	const isInjected = key => injectedSagas.has(key)
	const injectSaga = (key, saga) => {
		if (isInjected(key)) {
			return
		}
		const task = runSaga(saga)
		injectedSagas.set(key, task)
	}
	const ejectSaga = key => {
		const task = injectedSagas.get(key)
		if (task.isRunning()) {
			task.cancel()
		}
		injectedSagas.delete(key)
	}
	injectSaga('root', rootSaga)
	return { injectSaga, ejectSaga }
}

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

	// sagaMiddleware.run(rootSaga)
	Object.assign(store, createSagaInjector(sagaMiddleware.run, rootSaga))

	return { store }
}
