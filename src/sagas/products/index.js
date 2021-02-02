import { put } from 'redux-saga/effects'
import { createSliceSaga, SagaType } from 'redux-toolkit-saga'

import { getProducts, deleteProduct,
	addProduct, editProduct } from '../../api/products'
import {
	getProductsSuccess, getProductsFailed,
	deleteProductFailure, deleteProductSuccess,
	addProductFailure, addProductSuccess,
	editProductFailure, editProductSuccess,
	setIdleStatus
} from '../../store/products/productsSlice'

import { DEFAULT_NOTIFICATION_TIMEOUT } from '../../constants/settings'

const delay = (ms) => new Promise((res) => setTimeout(res, ms)) //!!!

const productsSagaSlice = createSliceSaga({
	// The name is the prefix to differentiate the slice actions
	name: 'products',

	// Define normal as the default saga for all sagas in caseSagas
	sagaType: SagaType.Normal,

	caseSagas: {
		onGetProducts: {
			*fn(action) {
				yield delay(10) // !!
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
			},
			sagaType: SagaType.TakeEvery
		},
		onDeleteProduct: {
			*fn(action) {
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
			},
			sagaType: SagaType.TakeEvery
		},
		onAddProduct: {
			*fn(action) {
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
			},
			sagaType: SagaType.TakeEvery
		},
		onEditProduct: {
			*fn(action) {
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
			},
			sagaType: SagaType.TakeEvery
		}
	}
})

export const productsSaga = productsSagaSlice.saga

export const {
	onGetProducts,
	onDeleteProduct,
	onEditProduct,
	onAddProduct
} = productsSagaSlice.actions
