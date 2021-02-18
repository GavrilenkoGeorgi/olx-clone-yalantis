import { put, call, select } from 'redux-saga/effects'
import { createSliceSaga, SagaType } from 'redux-toolkit-saga'

import {
	getOrdersSuccess,
	getOrdersFailure,
	getOrderDetailsSuccess,
	getOrderDetailsFailure,
	addOrderSuccess,
	addOrderFailure,
	selectLastAddedId,
	lastIdCleared
} from '../../store/orders/ordersSlice'
import { errorAdded } from '../../store/notifications/notificationsSlice'
import { cartEmptied } from '../../store/cart/cartSlice'

import { getOrders, getOrderDetails, addOrder } from '../../api/orders'
import { history } from '../../components/containers/App'
import { getErrorMessageText } from '../../utils'

// redirect after new order is created
function navigateTo(location) {
	history.push(location)
}

const ordersSagaSlice = createSliceSaga({
	name: 'orders',
	sagaType: SagaType.Normal,
	caseSagas: {
		onGetOrders: {
			*fn() {
				try {
					const orders = yield getOrders()
					yield put(getOrdersSuccess(orders))
				} catch (error) {
					const message = getErrorMessageText(error)
					if (message)
						yield put(errorAdded(message))
					yield put(getOrdersFailure('Can\'t get list orders.'))
				}
			},
			sagaType: SagaType.TakeEvery
		},
		onGetOrderDetails: {
			*fn({ payload }) {
				try {
					const order = yield getOrderDetails(payload)
					yield put(getOrderDetailsSuccess(order))
				} catch (error) {
					const message = getErrorMessageText(error)
					if (message)
						yield put(errorAdded(message))
					yield put(getOrderDetailsFailure(`Can't get order details ${payload.id}.`))
				}
			},
			sagaType: SagaType.TakeEvery
		},
		onAddOrder: {
			*fn(action) {
				try {
					const order = yield addOrder(action.payload)
					yield put(addOrderSuccess(order))
					yield put(cartEmptied())
					let id = yield select(selectLastAddedId)
					yield call(navigateTo, `/orders/${id}`)
					yield put(lastIdCleared())
				} catch (error) {
					const message = getErrorMessageText(error)
					if (message)
						yield put(errorAdded(message))
					yield put(addOrderFailure('Can\'t add new order.'))
				}
			},
			sagaType: SagaType.TakeEvery
		}
	}
})

export const ordersSaga = ordersSagaSlice.saga

export const {
	onAddOrder,
	onGetOrderDetails,
	onGetOrders
} = ordersSagaSlice.actions
