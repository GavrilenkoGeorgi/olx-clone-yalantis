import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CartContext } from '../../../context/CartContext'
import AddToCartButton from './AddToCartButton'

import products from '../../../fixtures/products.json'

const [ product ] = products.items
const setItems = jest.fn()

describe('<AddToCartButton /> component', () => {

	beforeEach(() => {
		render(
			<CartContext.Provider value={{ items: [], setItems }}>
				<AddToCartButton product={product} />
			</CartContext.Provider>
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText('Add to cart')).toBeInTheDocument()
	})

	it('clicking on it adds product to cart', () => {
		const btn = screen.getByText('Add to cart')
		userEvent.click(btn)

		expect(setItems).toHaveBeenCalledTimes(1)
		expect(setItems).toHaveBeenCalledWith([ product ])
	})
})
