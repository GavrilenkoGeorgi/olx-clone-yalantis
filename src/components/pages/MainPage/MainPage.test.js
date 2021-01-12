import React from 'react'
import { render, screen } from '@testing-library/react'
import MainPage from './MainPage'

describe('<MainPage /> component', () => {
	beforeEach(() => {
		render(
			<MainPage />
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText('Main page')).toBeInTheDocument()
		const linkToTheProductsPage = screen.getByText('List of products is here.')
		expect(linkToTheProductsPage).toHaveAttribute('href', '/products')
	})
})
