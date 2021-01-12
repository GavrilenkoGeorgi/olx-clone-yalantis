import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Notification from './Notification'

const close = jest.fn()

describe('<Notification /> component', () => {
	const notification = {
		message: 'Test error message',
		variant: 'error'
	}

	let view

	beforeEach(() => {
		view = render(
			<Notification notification={notification} close={close} />
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText(notification.message)).toBeInTheDocument()
		expect(screen.getByText(notification.message).closest('div')).toHaveClass('error')

		const closeButton = screen.getByRole('button', { name: 'Close' })
		userEvent.click(closeButton)
		expect(close).toHaveBeenCalledTimes(1)
	})

	it('renders info message', () => {
		const { rerender } = view
		const message = 'Test info message'

		rerender(
			<Notification notification={{ message }} close={close} />
		)

		expect(screen.getByText(message)).toBeInTheDocument()
		expect(screen.getByText(message).closest('div')).not.toHaveClass('error')
	})
})
