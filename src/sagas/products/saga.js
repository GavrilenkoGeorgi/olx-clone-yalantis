import { put, takeEvery } from 'redux-saga/effects'
import {
	getProductsRequest,
	getProductsSuccess,
	getProductsFailed
} from '../../store/products/productsSlice'

import { getProducts } from '../../api/products'

function* onGetProducts(action) {
	try {
		const products = yield getProducts(action.payload)
		yield put(getProductsSuccess(products))
	} catch (error) {
		yield put(getProductsFailed(error))
	}
}

export default function* productsSagaWatcher() {
	yield takeEvery(getProductsRequest, onGetProducts)
}
