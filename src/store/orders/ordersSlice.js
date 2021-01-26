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
	error: null
})

export const fetchOrders = createAsyncThunk('orders/fetchOrders',
	async () => {
		let response =  await productsListApi.get(URIs.orders)
		return response.data
	})

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		orderAdded(state, action) {
			ordersAdapter.addOne(state, action.payload)
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
	}
})

export const { productEdited, productAdded } = ordersSlice.actions

export default ordersSlice.reducer

export const {
	selectAll: selectAllOrders,
	selectById: selectOrderById,
	selectIds: selectOrderIds
} = ordersAdapter.getSelectors(state => state.orders)

export const selectOrdersStatus = state => state.orders.status

export const selectOrdersError = state => state.orders.error
