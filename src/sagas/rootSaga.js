import { all } from 'redux-saga/effects'
import notificationsSagaWatcher from './notifications/saga'
import productsSaga from './products/saga'
import watchOrders from './orders/saga'
import cartWatcher from './cart/saga'

export default function* rootSaga() {
	yield all([
		notificationsSagaWatcher(),
		productsSaga(),
		watchOrders(),
		cartWatcher()
	])
}
