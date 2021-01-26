import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit'
import { productsListApi } from '../../api/productsApi'
import URIs from '../../api/URIs'

const productsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initialState = productsAdapter.getInitialState({
	page: 0,
	perPage: 0,
	totalItems: 0,
	status: 'idle',
	error: null
})

export const fetchProducts = createAsyncThunk('products/fetchProducts',
	async (query) => {
		let response =  await productsListApi.get(URIs.products + query.toString())
		return response.data
	})

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		productEdited: productsAdapter.updateOne,
		productAdded(state, action) {
			productsAdapter.addOne(state, action.payload)
		}
	},
	extraReducers: {
		[fetchProducts.pending]: (state) => {
			state.status = 'loading'
		},
		[fetchProducts.fulfilled]: (state, { payload }) => {
			const { page, perPage, totalItems, items } = payload

			state.status = 'succeeded'
			state.page = page
			state.perPage = perPage
			state.totalItems = totalItems

			productsAdapter.setAll(state, items)
		},
		[fetchProducts.rejected]: (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		},
	}
})

export const { productEdited, productAdded } = productsSlice.actions

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
