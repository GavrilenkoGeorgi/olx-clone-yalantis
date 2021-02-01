import { call, put, takeEvery, select } from 'redux-saga/effects'

import {
	getOrdersRequest,
	getOrdersSuccess,
	getOrdersFailure,
	getOrderDetailsRequest,
	getOrderDetailsSuccess,
	getOrderDetailsFailure,
	addOrderRequest,
	addOrderSuccess,
	addOrderFailure,
	selectLastAddedId,
	lastIdCleared
} from '../../store/orders/ordersSlice'

import { getOrders, getOrderDetails, addOrder } from '../../api/orders'
import { history } from '../../components/containers/App'

// redirect after new order is created
function navigateTo(location) {
	history.push(location)
}

function* onGetOrders() {
	try {
		const orders = yield getOrders()
		yield put(getOrdersSuccess(orders))
	} catch (error) {
		if (error.message) yield put(getOrdersFailure(error.message))
		else yield put(getOrdersFailure('Something went wrong, can\'t get orders.'))
	}
}

function* onGetOrderDetails(action) {
	try {
		const order = yield getOrderDetails(action.payload)
		yield put(getOrderDetailsSuccess(order))
	} catch (error) {
		if (error.message) yield put(getOrderDetailsFailure(error.message))
		else yield put(getOrderDetailsFailure('Something went wrong, can\'t get order details.'))
	}
}

function* onAddOrder(action) {
	try {
		const order = yield addOrder(action.payload)
		yield put(addOrderSuccess(order))
		let id = yield select(selectLastAddedId)
		yield call(navigateTo, `/orders/${id}`)
		yield put(lastIdCleared())
	} catch (error) {
		if (error.message) yield put(addOrderFailure(error.message))
		else yield put(addOrderFailure('Something went wrong, can\'t add new order.'))
	}
}

export default function* watchOrders() {
	yield takeEvery(getOrdersRequest, onGetOrders)
	yield takeEvery(getOrderDetailsRequest, onGetOrderDetails)
	yield takeEvery(addOrderRequest, onAddOrder)
}
