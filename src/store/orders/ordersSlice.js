import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit'
import { productsListApi } from '../../api/productsApi'
import URIs from '../../api/URIs'

const ordersAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initialState = ordersAdapter.getInitialState({
	status: 'idle',
	error: null,
	lastId: '',
	singleOrderDetails: {}
})

export const fetchOrders = createAsyncThunk('orders/fetchOrders',
	async () => {
		let response =  await productsListApi.get(URIs.orders)
		return response.data
	})

export const postOrder = createAsyncThunk('orders/postOrder',
	async (order) => {
		let response =  await productsListApi.post(URIs.orders, order)
		return response.data
	})

export const getOrder = createAsyncThunk('orders/getOrder',
	async (id) => {
		let response =  await productsListApi.get(`${URIs.orders}/${id}`)
		return response.data
	})

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		orderAdded(state, action) {
			ordersAdapter.addOne(state, action.payload)
		},
		lastIdCleared(state) {
			state.lastId = ''
		}
	},
	extraReducers: {
		[fetchOrders.pending]: (state) => {
			state.status = 'loading'
		},
		[fetchOrders.fulfilled]: (state, { payload }) => {
			state.status = 'succeeded'
			ordersAdapter.setAll(state, payload.items)
		},
		[fetchOrders.rejected]: (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		},
		[postOrder.fulfilled]: (state, { payload }) => {
			state.status = 'succeeded'
			const createdAt = new Date().toISOString()
			ordersAdapter.addOne(state, { ...payload, createdAt })
			state.lastId = payload.id
		},
		[getOrder.pending]: (state) => {
			state.status = 'loading'
		},
		[getOrder.fulfilled]: (state, { payload }) => {
			state.status = 'succeeded'
			state.singleOrderDetails = payload
		},
		[getOrder.rejected]: (state) => {
			state.status = 'failed'
		}
	}
})

export const { orderAdded, lastIdCleared } = ordersSlice.actions //ffs

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
