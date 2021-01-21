import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import CartWidget from './CartWidget'
import products from '../../../fixtures/products.json'

const [ product ] = products.items
const mockStore = configureStore([])

describe('<CartWidget /> component', () => {
	let view
	let store

	beforeEach(() => {
		store = mockStore({
			cart: {
				ids: [ product.id ],
				entities: { [ product.id ]: product },
				total: product.price
			}
		})

		view = render(
			<Provider store={store}>
				<BrowserRouter>
					<CartWidget />
				</BrowserRouter>
			</Provider>
		)
	})

	it('renders correctly', () => {
		const { rerender } = view

		rerender(
			<Provider store={store}>
				<BrowserRouter>
					<CartWidget />
				</BrowserRouter>
			</Provider>
		)

		expect(screen.getByText(product.price)).toBeInTheDocument()
	})
})
