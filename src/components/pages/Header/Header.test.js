import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from  '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Header from './Header'
import products from '../../../fixtures/products.json'

const [ product ] = products.items
const mockStore = configureStore([])

describe('<Header /> component', () => {
	let store

	beforeEach(() => {
		store = mockStore({
			cart: {
				ids: [ product.id ],
				entities: { [ product.id ]: product },
				total: product.price
			}
		})

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		)
	})

	it('renders correctly', () => {
		const [ linkToTheMainPage ] = screen.getAllByText('MAIN')
		expect(linkToTheMainPage).toHaveAttribute('href', '/')

		const [ linkToTheProductsPage ] = screen.getAllByText('PRODUCTS')
		expect(linkToTheProductsPage).toHaveAttribute('href', '/products')

		const cartWidgetLink = screen.getByText(product.price).closest('a')
		expect(cartWidgetLink).toHaveAttribute('href', '/cart')
	})
})
