import React from 'react'
import { render, screen } from '@testing-library/react'

import ErrorFallback from './ErrorFallback'

const testErrorMessage = {
	message: 'Test error message',
	stack: 'Some test error stack'
}

describe('<ErrorFallback /> component', () => {
	beforeEach(() => {
		render(
			<ErrorFallback error={testErrorMessage} />
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText(testErrorMessage.message)).toBeInTheDocument()
		expect(screen.getByText(testErrorMessage.stack)).toBeInTheDocument()
	})
})
