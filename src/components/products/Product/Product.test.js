import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Product from './Product'
import products from '../../../fixtures/products.json'
import { formatDate } from '../../../utils'

const [ product ] = products.items
const mockStore = configureStore([])

describe('<Product /> component', () => {
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
				<Product product={product} />
			</Provider>
		)
	})

	it('renders correctly', () => {
		const productOrigin = screen.getByText('Origin:').closest('p')
		expect(within(productOrigin).getByText(product.origin)).toBeInTheDocument()

		const productPrice = screen.getByText('Price:').closest('p')
		expect(within(productPrice).getByText(product.price)).toBeInTheDocument()

		const productDate = formatDate(product.createdAt)
		expect(screen.getByText(productDate)).toBeInTheDocument()
	})
})
