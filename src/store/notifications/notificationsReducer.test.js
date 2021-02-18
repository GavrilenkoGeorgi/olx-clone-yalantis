import reducer from './notificationsSlice'
import * as actions from './notificationsSlice'
import { initialState } from './notificationsSlice'

describe('Notifications reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {}))
			.toEqual(initialState)
	})

	it('should handle messageAdded action', () => {
		expect(
			reducer(initialState, {
				type: actions.messageAdded,
				payload: 'Run the tests'
			}))
			.toEqual({
				message: 'Run the tests',
				fetching: false,
				error: ''
			})
	})

	it('should handle messageCleared action', () => {
		expect(
			reducer({ ...initialState, message: 'message to clear' }, {
				type: actions.messageCleared
			}))
			.toEqual({
				message: '',
				fetching: false,
				error: ''
			})
	})

	it('should handle fetchingState action', () => {
		expect(
			reducer(initialState, {
				type: actions.fetchingState,
				payload: true
			}))
			.toEqual({
				message: '',
				fetching: true,
				error: ''
			})
	})

	it('should handle errorAdded action', () => {
		expect(
			reducer(initialState, {
				type: actions.errorAdded,
				payload: 'test error message'
			}))
			.toEqual({
				message: '',
				fetching: false,
				error: 'test error message'
			})
	})

	it('should handle errorCleared action', () => {
		expect(
			reducer(initialState, {
				type: actions.errorCleared,
				payload: 'test error to clear'
			}))
			.toEqual({
				message: '',
				fetching: false,
				error: ''
			})
	})

	it('should handle notificationsCleared action', () => {
		expect(
			reducer(initialState, {
				type: actions.notificationsCleared
			}))
			.toEqual({
				message: '',
				fetching: false,
				error: ''
			})
	})

})
