import { put, delay } from 'redux-saga/effects'
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
import {
	notificationsCleared,
	messageAdded
} from '../../store/notifications/notificationsSlice'

import { DEFAULT_NOTIFICATION_TIMEOUT, DEBOUNCE_TIMEOUT } from '../../constants/settings'

const productsSagaSlice = createSliceSaga({
	// The name is the prefix to differentiate the slice actions
	name: 'products',

	// Define normal as the default saga for all sagas in caseSagas
	sagaType: SagaType.Normal,

	caseSagas: {
		onGetProducts: {
			*fn({ payload }) {
				try {
					let products
					if (!payload || payload === '?editable=true') {
						// unfiltered list of (created) products
						products = yield getProducts(payload || '')
					} else { // everything else
						yield delay(DEBOUNCE_TIMEOUT)
						products = yield getProducts(payload)
					}
					yield put(getProductsSuccess(products))
				} catch (error) {
					if (error.message) yield put(getProductsFailed(error.message)) // moar error messages!
					else yield put(getProductsFailed('Something went wrong, can\'t get products.'))
				} finally {
					yield delay(DEFAULT_NOTIFICATION_TIMEOUT)
					yield put(setIdleStatus())
				}
			},
			sagaType: SagaType.TakeLatest
		},
		onDeleteProduct: { // no product deletion in the task
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
			*fn({ payload }) {
				try {
					const data = yield addProduct(payload)
					yield put(addProductSuccess(data))
					yield put(messageAdded(`${payload.product.name} added!`))
				} catch (error) {
					if (error.message) yield put(addProductFailure(error.message))
					else yield put(addProductFailure('Something went wrong, can\'t create new product.'))
				} finally {
					yield delay(DEFAULT_NOTIFICATION_TIMEOUT)
					yield put(setIdleStatus())
					yield put(notificationsCleared())
				}
			},
			sagaType: SagaType.TakeEvery
		},
		onEditProduct: {
			*fn({ payload }) {
				try {
					const data = yield editProduct(payload)
					yield put(editProductSuccess(data))
					yield put(messageAdded(`${payload.product.name} successfully edited!`))
				} catch (error) {
					if (error.message) yield put(editProductFailure(error.message))
					else yield put(editProductFailure('Something went wrong, can\'t edit product.'))
				} finally {
					yield delay(DEFAULT_NOTIFICATION_TIMEOUT)
					yield put(setIdleStatus())
					yield put(notificationsCleared())
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
