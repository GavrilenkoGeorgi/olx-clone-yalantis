import reducer from './ordersSlice'
import * as actions from './ordersSlice'

import { initialState } from './ordersSlice'
import { items } from '../../fixtures/orders.json'
import * as settings from '../../constants/settings'

const [ order ] = items

describe('Orders reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {}))
			.toEqual(initialState)
	})

	it('should handle getOrderDetailsSuccess action', () => {
		expect(
			reducer(initialState, {
				type: actions.getOrderDetailsSuccess,
				payload: order
			}))
			.toEqual({
				...initialState,
				singleOrderDetails: order,
				status: settings.SUCCESS_STATUS
			})
	})

	it('should handle getOrderDetailsFailure action', () => {
		expect(
			reducer(initialState, {
				type: actions.getOrderDetailsFailure,
				payload: 'get orders details error'
			}))
			.toEqual({
				...initialState,
				status: settings.FAILURE_STATUS,
				error: 'get orders details error'
			})
	})

	/* it.only('should handle addOrderSuccess action', () => {
		const { createdAt, ...newOrder } = order

		expect(
			reducer(initialState, {
				type: actions.addOrderSuccess,
				payload: newOrder
			}))
			.toEqual({
				entities: { [newOrder.id]: { ...newOrder } },
				ids: [ newOrder.id ],
				lastId: newOrder.id,
				status: settings.SUCCESS_STATUS,
				error: null,
				singleOrderDetails: {}
			})
	}) */

	it('should handle addOrderFailure action', () => {
		expect(
			reducer(initialState, {
				type: actions.addOrderFailure,
				payload: 'add order failed error'
			}))
			.toEqual({
				...initialState,
				status: settings.FAILURE_STATUS,
				error: 'add order failed error'
			})
	})

	it('should handle getOrdersSuccess action', () => {
		const [ firstOrder ] = items
		expect(
			reducer(initialState, {
				type: actions.getOrdersSuccess,
				payload: { items: [ firstOrder ] }
			}))
			.toEqual({
				...initialState,
				status: settings.SUCCESS_STATUS,
				entities: { [firstOrder.id]: firstOrder },
				ids: [ firstOrder.id ]
			})
	})

	it('should handle getOrdersFailure action', () => {
		expect(
			reducer(initialState, {
				type: actions.getOrderDetailsFailure,
				payload: 'get orders failure error'
			}))
			.toEqual({
				...initialState,
				status: settings.FAILURE_STATUS,
				error: 'get orders failure error'
			})
	})

})
