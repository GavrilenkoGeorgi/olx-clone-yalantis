import { put, takeEvery, delay } from 'redux-saga/effects'

import {
	getProductsRequest, getProductsSuccess, getProductsFailed,
	deleteProductRequest, deleteProductFailure, deleteProductSuccess,
	addProductFailure, addProductRequest, addProductSuccess,
	editProductFailure, editProductRequest, editProductSuccess,
	setIdleStatus
} from '../../store/products/productsSlice'
import { getProducts, deleteProduct,
	addProduct, editProduct } from '../../api/products'

import { DEFAULT_NOTIFICATION_TIMEOUT } from '../../constants/settings'

function* onGetProducts(action) {
	try {
		const products = yield getProducts(action.payload)
		yield put(getProductsSuccess(products))
	} catch (error) {
		if (error.message) yield put(getProductsFailed(error.message))
		else yield put(getProductsFailed('Something went wrong, can\'t get products.'))
	} finally {
		yield delay(DEFAULT_NOTIFICATION_TIMEOUT)
		yield put(setIdleStatus())
	}
}

function* onDeleteProduct(action) {
	try {
		yield deleteProduct(action.payload)
		yield put(deleteProductSuccess(action.payload))
	} catch (error) {
		if (error.message) yield put(deleteProductFailure(error.message))
		else yield put(deleteProductFailure('Something went wrong, can\'t delete product.'))
	} finally {
		yield delay(DEFAULT_NOTIFICATION_TIMEOUT)
		yield put(setIdleStatus())
	}
}

function* onAddProduct(action) {
	try {
		const data = yield addProduct(action.payload)
		yield put(addProductSuccess(data))
	} catch (error) {
		if (error.message) yield put(addProductFailure(error.message))
		else yield put(addProductFailure('Something went wrong, can\'t create new product.'))
	} finally {
		yield delay(DEFAULT_NOTIFICATION_TIMEOUT)
		yield put(setIdleStatus())
	}
}

function* onEditProduct(action) {
	try {
		const data = yield editProduct(action.payload)
		yield put(editProductSuccess(data))
	} catch (error) {
		if (error.message) yield put(editProductFailure(error.message))
		else yield put(editProductFailure('Something went wrong, can\'t edit product.'))
	} finally {
		yield delay(DEFAULT_NOTIFICATION_TIMEOUT)
		yield put(setIdleStatus())
	}
}

export default function* productsSagaWatcher() {
	yield takeEvery(getProductsRequest, onGetProducts)
	yield takeEvery(deleteProductRequest, onDeleteProduct)
	yield takeEvery(addProductRequest, onAddProduct)
	yield takeEvery(editProductRequest, onEditProduct)
}
