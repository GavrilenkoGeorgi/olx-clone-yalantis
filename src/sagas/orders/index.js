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
import { cartEmptied } from '../../store/cart/cartSlice'

import { getOrders, getOrderDetails, addOrder } from '../../api/orders'
import { history } from '../../components/containers/App'

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
					if (error.message) yield put(getOrdersFailure(error.message))
					else yield put(getOrdersFailure('Something went wrong, can\'t get orders.'))
				}
			},
			sagaType: SagaType.TakeEvery
		},
		onGetOrderDetails: {
			*fn(action) {
				try {
					const order = yield getOrderDetails(action.payload)
					yield put(getOrderDetailsSuccess(order))
				} catch (error) {
					if (error.message) yield put(getOrderDetailsFailure(error.message))
					else yield put(getOrderDetailsFailure('Something went wrong, can\'t get order details.'))
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
					if (error.message) yield put(addOrderFailure(error.message))
					else yield put(addOrderFailure('Something went wrong, can\'t add new order.'))
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
