import { put, delay } from 'redux-saga/effects'
import { createSliceSaga, SagaType } from 'redux-toolkit-saga'

import { getProducts, deleteProduct,
	addProduct, editProduct } from '../../api/products'
import {
	getProductsSuccess,
	deleteProductFailure, deleteProductSuccess,
	addProductFailure, addProductSuccess,
	editProductFailure, editProductSuccess,
	setIdleStatus
} from '../../store/products/productsSlice'
import {
	notificationsCleared,
	messageAdded,
	errorAdded
} from '../../store/notifications/notificationsSlice'

import { DEFAULT_NOTIFICATION_TIMEOUT, DEBOUNCE_TIMEOUT } from '../../constants/settings'
import { getErrorMessageText } from '../../utils'

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
					const message = getErrorMessageText(error)
					if (message)
						yield put(errorAdded(message))
				} finally {
					yield delay(DEFAULT_NOTIFICATION_TIMEOUT)
					yield put(setIdleStatus())
				}
			},
			sagaType: SagaType.TakeLatest
		},
		onDeleteProduct: { // no product deletion in the task
			*fn({ payload }) {
				try {
					yield deleteProduct(payload)
					yield put(deleteProductSuccess(payload))
				} catch (error) {
					const message = getErrorMessageText(error)
					if (message)
						yield put(errorAdded(message))
					yield put(deleteProductFailure(`Can't delete product ${payload.id}`))
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
					const message = getErrorMessageText(error)
					if (message)
						yield put(errorAdded(message))
					yield put(addProductFailure(`Can't add product ${payload.product.name}`))
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
					const message = getErrorMessageText(error)
					if (message)
						yield put(errorAdded(message))
					yield put(editProductFailure(`Can't edit product ${payload.product.name}`))
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
