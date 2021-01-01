import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App main view', () => {

	beforeEach(() => {
		render(<App />)
	})

	it('renders correctly', () => {
		expect(screen.getByText(/Main page/)).toBeInTheDocument()

		const linkToTheProductsPage = screen.getByText(/List of products is here/)
		expect(linkToTheProductsPage).toBeInTheDocument()
		expect(linkToTheProductsPage).toHaveAttribute('href', '/products')
	})

	it('navbar is present', () => {
		const mainPageLink = screen.getByText('Main')

		expect(mainPageLink).toBeInTheDocument()
		expect(mainPageLink).toHaveClass('active')
		expect(mainPageLink).toHaveAttribute('href', '/')

		const productsPageLink = screen.getByText('Products')
		expect(productsPageLink).toHaveAttribute('href', '/products')
	})

	it('footer is present', () => {
		expect(screen.getByText(/Yalantis OLX clone/)).toBeInTheDocument()
	})
})
