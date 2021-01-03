import React from 'react'
import { render, screen } from '@testing-library/react'
import FourOFour from './FourOFour'

describe('<FourOFor /> component', () => {
	beforeAll(() => {
		render(
			<FourOFour />
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText(/You've got 404!/)).toBeInTheDocument()

		const linkToTheMainPage = screen.getByText('main page')
		expect(linkToTheMainPage).toHaveAttribute('href', '/')

		const linkToTheProductsPage = screen.getByText('list of products')
		expect(linkToTheProductsPage).toHaveAttribute('href', '/products')
	})
})
