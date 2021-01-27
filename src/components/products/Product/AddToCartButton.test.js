import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import AddToCartButton from './AddToCartButton'
import products from '../../../fixtures/products.json'

import { itemAdded } from '../../../store/cart/cartSlice'

const [ product ] = products.items
const mockStore = configureStore([])

describe('<AddToCartButton /> component', () => {
	let store

	beforeEach(() => {
		store = mockStore({
			cart: {
				ids: [ product.id ],
				entities: { [ product.id ]: product },
			}
		})

		store.dispatch = jest.fn()

		render(
			<Provider store={store}>
				<AddToCartButton product={product} />
			</Provider>
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText('Add to cart')).toBeInTheDocument()
	})

	it('clicking on it adds product to cart', () => {
		const btn = screen.getByText('Add to cart')
		userEvent.click(btn)

		// eslint-disable-next-line
		const { quantity, ...actionPayload } = product

		expect(store.dispatch).toHaveBeenCalledTimes(1)
		expect(store.dispatch).toHaveBeenCalledWith(
			itemAdded(actionPayload)
		)
	})
})
