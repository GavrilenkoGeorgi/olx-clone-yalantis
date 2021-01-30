import { put, takeEvery } from 'redux-saga/effects'
import {
	getProductsRequest,
	getProductsSuccess,
	getProductsFailed,
	deleteProductRequest,
	deleteProductFailure,
	deleteProductSuccess
} from '../../store/products/productsSlice'

import { getProducts, deleteProduct } from '../../api/products'

function* onGetProducts(action) {
	try {
		const products = yield getProducts(action.payload)
		yield put(getProductsSuccess(products))
	} catch (error) {
		yield put(getProductsFailed(error))
	}
}

function* onDeleteProduct(action) {
	try {
		yield deleteProduct(action.payload)
		yield put(deleteProductSuccess(action.payload))
	} catch (error) {
		yield put(deleteProductFailure(error.message))
	}
}

export default function* productsSagaWatcher() {
	yield takeEvery(getProductsRequest, onGetProducts)
	yield takeEvery(deleteProductRequest, onDeleteProduct)
}
