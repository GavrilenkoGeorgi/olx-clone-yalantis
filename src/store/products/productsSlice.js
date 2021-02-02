import {
	createSlice,
	createEntityAdapter
} from '@reduxjs/toolkit'

import * as settings from '../../constants/settings'

const productsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initialState = productsAdapter.getInitialState({
	page: 0,
	perPage: 0,
	totalItems: 0,
	status: settings.IDLE_STATUS,
	error: null
})

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setIdleStatus(state) {
			state.status = settings.IDLE_STATUS
		},
		// edit product
		editProductSuccess(state, action) {
			state.status = settings.SUCCESS_STATUS
			productsAdapter.upsertOne(state, action.payload)
		},
		editProductFailure(state) {
			state.status = settings.FAILURE_STATUS
		},
		// add product
		addProductFailure(state, action) {
			state.status = settings.FAILURE_STATUS
			state.error = action.payload
		},
		addProductSuccess(state, action) {
			productsAdapter.addOne(state, action.payload)
			state.status = settings.SUCCESS_STATUS
			state.productCreated = true
		},
		// delete single product
		deleteProductSuccess(state, action) {
			productsAdapter.removeOne(state, action.payload)
			state.status = settings.SUCCESS_STATUS
		},
		deleteProductFailure(state, action) {
			state.status = settings.FAILURE_STATUS
			state.error = action.error.message
		},
		// get list of products
		getProductsFailed(state, action) {
			state.status = settings.FAILURE_STATUS
			state.error = action.error.message
		},
		getProductsSuccess(state, { payload }) {
			const { page, perPage, totalItems, items } = payload
			state.status = settings.SUCCESS_STATUS
			state.page = page
			state.perPage = perPage
			state.totalItems = totalItems

			productsAdapter.setAll(state, items)
		}
	}
})

export const {
	setIdleStatus,
	getProductsSuccess,
	getProductsFailed,
	productEdited,
	deleteProductSuccess,
	deleteProductFailure,
	addProductFailure,
	addProductSuccess,
	editProductFailure,
	editProductSuccess
} = productsSlice.actions

export default productsSlice.reducer

export const {
	selectAll: selectAllProducts,
	selectById: selectProductById,
	selectIds: selectProductIds
} = productsAdapter.getSelectors(state => state.products)

export const selectProductsStatus = state => state.products.status

export const selectProductsError = state => state.products.error

export const selectPaginationInfo = state => ({
	currentPage: state.products.page,
	perPage: state.products.perPage,
	totalItems: state.products.totalItems
})
