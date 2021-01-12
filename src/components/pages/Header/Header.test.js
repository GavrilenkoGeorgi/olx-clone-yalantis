import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from  '@testing-library/react'

import Header from './Header'

describe('<Header /> component', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		)
	})

	it('renders correctly', () => {
		const linkToTheMainPage = screen.getByText('Main')
		expect(linkToTheMainPage).toHaveAttribute('href', '/')

		const linkToTheProductsPage = screen.getByText('Products')
		expect(linkToTheProductsPage).toHaveAttribute('href', '/products')

		const cartWidgetLink = screen.getByText('0').closest('a')
		expect(cartWidgetLink).toHaveAttribute('href', '/cart')
	})
})
