import {
	createSlice,
	createEntityAdapter
} from '@reduxjs/toolkit'

import * as settings from '../../constants/settings'

const ordersAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

export const initialState = ordersAdapter.getInitialState({
	status: 'idle',
	error: null,
	lastId: '',
	singleOrderDetails: {}
})

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		// get order details
		getOrderDetailsSuccess(state, action) {
			state.status = settings.SUCCESS_STATUS
			state.singleOrderDetails = action.payload
		},
		getOrderDetailsFailure(state, action) {
			state.status = settings.FAILURE_STATUS
			state.error = action.payload
		},
		// add order
		addOrderSuccess(state, action) {
			state.status = settings.SUCCESS_STATUS
			// createdAt field is absent in the api reponse
			const createdAt = new Date().toISOString() // this messes up tests
			ordersAdapter.addOne(state, { ...action.payload, createdAt })
			// set latest added ID for redirect
			state.lastId = action.payload.id
		},
		addOrderFailure(state, action) {
			state.status = settings.FAILURE_STATUS
			state.error = action.payload
		},
		// get all orders
		getOrdersSuccess(state, { payload }) {
			state.status = settings.SUCCESS_STATUS
			ordersAdapter.setAll(state, payload.items)
		},
		getOrdersFailure(state, action) {
			state.status = settings.FAILURE_STATUS
			state.error = action.payload
		},
		lastIdCleared(state) { // !
			state.lastId = ''
		}
	}
})

export const {
	lastIdCleared,
	getOrdersSuccess,
	getOrdersFailure,
	getOrderDetailsSuccess,
	getOrderDetailsFailure,
	addOrderSuccess,
	addOrderFailure
} = ordersSlice.actions

export default ordersSlice.reducer

export const {
	selectAll: selectAllOrders,
	selectById: selectOrderById,
	selectIds: selectOrderIds
} = ordersAdapter.getSelectors(state => state.orders)

export const selectOrdersStatus = state => state.orders.status

export const selectOrdersError = state => state.orders.error

export const selectLastAddedId = state => state.orders.lastId

export const selectSigleOrderDetails = state => state.orders.singleOrderDetails
