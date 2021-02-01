import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import App from './App'
import products from '../../fixtures/products.json'

const [ product ] = products.items
const mockStore = configureStore([])

describe('App main view', () => {
	let store

	beforeEach(() => {
		store = mockStore({
			cart: {
				ids: [ product.id ],
				entities: { [ product.id ]: product },
				total: product.price
			},
			notifications: {
				message: '',
				fetching: false,
				error: ''
			}
		})

		render(
			<Provider store={store}>
				<App />
			</Provider>
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText(/Main page/)).toBeInTheDocument()

		const linkToTheProductsPage = screen.getByText(/List of products is here/)
		expect(linkToTheProductsPage).toBeInTheDocument()
		expect(linkToTheProductsPage).toHaveAttribute('href', '/products')
	})

	it('navbar is present', () => {
		const [ mainPageLink ] = screen.getAllByText('MAIN')

		expect(mainPageLink).toBeInTheDocument()
		expect(mainPageLink).toHaveClass('active')
		expect(mainPageLink).toHaveAttribute('href', '/')

		const [ productsPageLink ] = screen.getAllByText('PRODUCTS')
		expect(productsPageLink).toHaveAttribute('href', '/products')
	})

	it('footer is present', () => {
		expect(screen.getByText(/Yalantis OLX clone/)).toBeInTheDocument()
	})
})
