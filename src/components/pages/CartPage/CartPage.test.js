import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { calcTotal } from '../../../utils'
import CartPage from './CartPage'
import products from '../../../fixtures/products.json'

const [ product ] = products.items
const mockStore = configureStore([])

describe('<CartPage /> component', () => {
	let store

	beforeEach(() => {
		store = mockStore({
			cart: {
				ids: [ product.id ],
				entities: { [ product.id ]: product },
				total: calcTotal(products.items)
			}
		})

		render(
			<Provider store={store}>
				<BrowserRouter>
					<CartPage />
				</BrowserRouter>
			</Provider>
		)
	})

	it('renders correctly', () => {
		const total = calcTotal(products.items)

		expect(screen.getByText('Total items: 1'))
			.toBeInTheDocument()
		expect(screen.getByText(`Running total: ${total}`))
			.toBeInTheDocument()

		const firstGroup = screen.getByText(product.origin).closest('div')
		expect(within(firstGroup).getByText(product.price)).toBeInTheDocument()
		expect(within(firstGroup).getByText('1 pcs')).toBeInTheDocument()
	})
})
