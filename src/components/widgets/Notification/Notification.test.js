import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Notification from './Notification'

const mockStore = configureStore([])

describe('<Notification /> component', () => {
	let store
	let view

	beforeEach(() => {
		store = mockStore({
			notifications: {
				message: '',
				fetching: false,
				error: 'Test error'
			}
		})
		view = render(
			<Provider store={store}>
				<Notification />
			</Provider>
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText('Test error')).toBeInTheDocument()
		expect(screen.getByText('Test error').closest('div')).toHaveClass('error')

		expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
	})

	it('renders info message', () => {
		const { rerender } = view
		const message = 'Test info message'

		store = mockStore({
			notifications: {
				message,
				fetching: false,
				error: ''
			}
		})

		rerender(
			<Provider store={store}>
				<Notification />
			</Provider>
		)

		expect(screen.getByText(message)).toBeInTheDocument()
		expect(screen.getByText(message).closest('div')).not.toHaveClass('error')
	})
})
