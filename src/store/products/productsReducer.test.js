import reducer from './productsSlice'
import * as actions from './productsSlice'

import { initialState } from './productsSlice'
import products from '../../fixtures/products.json'
import * as settings from '../../constants/settings'

const [ product ] = products.items

const singleEntity = {
	ids: [ product.id ],
	entities: {
		[product.id]: product
	}
}

describe('Products reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {}))
			.toEqual(initialState)
	})

	it('should handle editProductSuccess action', () => {
		const state = { ... initialState, ...singleEntity }
		const editedProduct = { ...product, name: 'edit' }

		expect(
			reducer(state, {
				type: actions.editProductSuccess,
				payload: editedProduct
			}))
			.toEqual({ ...state, entities: { [product.id]: editedProduct },
				status: settings.SUCCESS_STATUS
			})
	})

	it('should handle editProductFailure action', () => {
		expect(
			reducer(initialState, {
				type: actions.editProductFailure
			}))
			.toEqual({
				...initialState,
				status: settings.FAILURE_STATUS
			})
	})

	it('should handle addProductSuccess action', () => {
		expect(
			reducer(initialState, {
				type: actions.addProductSuccess,
				payload: product
			}))
			.toEqual({ ...initialState, ...singleEntity,
				productCreated: true,
				status: settings.SUCCESS_STATUS
			})
	})

	it('should handle addProductFailure action', () => {
		expect(
			reducer(initialState, {
				type: actions.addProductFailure,
				payload: 'add product failure error'
			}))
			.toEqual({
				...initialState,
				status: settings.FAILURE_STATUS,
				error: 'add product failure error'
			})
	})

	it('should handle deleteProductSuccess action', () => {
		const state = { ...initialState, ...singleEntity }

		expect(
			reducer(initialState, {
				type: actions.deleteProductSuccess,
				payload: product
			}))
			.toEqual({ ...state, ids: [], entities: {},
				status: settings.SUCCESS_STATUS
			})
	})

	it('should handle deleteProductFailure action', () => {
		expect(
			reducer(initialState, {
				type: actions.deleteProductFailure,
				error: { message: 'delete product failure error' }
			}))
			.toEqual({
				...initialState,
				status: settings.FAILURE_STATUS,
				error: 'delete product failure error'
			})
	})

	it('should handle getProductsSuccess action', () => {
		const [ firstProduct, secondProduct, thirdProduct ] = products.items

		const entities = {
			ids: [ thirdProduct.id, secondProduct.id, firstProduct.id ],
			entities: {
				[firstProduct.id]: firstProduct,
				[secondProduct.id]: secondProduct,
				[thirdProduct.id]: thirdProduct
			}
		}

		expect(
			reducer(initialState, {
				type: actions.getProductsSuccess,
				payload: products
			}))
			.toEqual({ ...initialState, ...entities,
				page: products.page,
				perPage: products.perPage,
				totalItems: products.totalItems,
				status: settings.SUCCESS_STATUS,
			})
	})
})
