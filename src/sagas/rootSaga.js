import { all, fork } from 'redux-saga/effects'
import { notificationsSaga } from './notifications'
import { productsSaga } from './products/index'
import { ordersSaga } from './orders'
import { cartSaga } from './cart'

export default function* rootSaga() {
	yield all([
		fork(notificationsSaga),
		fork(productsSaga),
		fork(ordersSaga),
		fork(cartSaga)
	])
}
