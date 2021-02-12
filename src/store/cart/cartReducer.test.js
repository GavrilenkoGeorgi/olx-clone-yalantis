import reducer from './cartSlice'
import * as actions from './cartSlice'

import { initialState } from './cartSlice'
import { items } from '../../fixtures/products.json'

const [ item ] = items

const cartWithOneItem = {
	entities: { [item.id]: item },
	ids: [ item.id ],
	total: item.price * item.quantity
}

describe('Cart reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {}))
			.toEqual(initialState)
	})

	it('should handle cartEmptied action', () => {
		expect(
			reducer({ ...initialState, total: 33 }, {
				type: actions.cartEmptied
			}))
			.toEqual(initialState)
	})

	it('should handle itemAdded action', () => {
		expect(
			reducer(initialState, {
				type: actions.itemAdded,
				payload: item
			}))
			.toEqual({
				entities: { [item.id]: item },
				ids: [ item.id ],
				total: item.price * item.quantity
			})
	})

	it('should handle itemRemoved action', () => {
		expect(
			reducer(cartWithOneItem, {
				type: actions.itemRemoved,
				payload: item
			}))
			.toEqual({
				entities: {},
				ids: [],
				total: 0
			})
	})

	it('should handle itemsRemoved action', () => {
		expect(
			reducer(cartWithOneItem, {
				type: actions.itemRemoved,
				payload: item
			}))
			.toEqual({
				entities: {},
				ids: [],
				total: 0
			})
	})

	it('should handle itemQuantityRemoved action', () => {

		const multipleItem = { ...item, quantity: 5 }
		const { id, price, quantity } = multipleItem

		const cartWithMultipleItemPcs = {
			entities: { [id]: multipleItem },
			ids: [ id ],
			total: price * quantity
		}

		expect(
			reducer(cartWithMultipleItemPcs, {
				type: actions.itemQuantityRemoved,
				payload: { pcs: 2, id } // remove two pcs of item
			}))
			.toEqual({
				entities: { [id]: { ...multipleItem, quantity: quantity - 2 } },
				ids: [ id ],
				total: price * (quantity - 2)
			})
	})

})
