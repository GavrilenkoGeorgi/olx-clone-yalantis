import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { CartContext } from '../../../context/CartContext'
import { calcTotal } from '../../../utils'

import CartWidget from './CartWidget'
import products from '../../../fixtures/products.json'

const setItems = jest.fn()

describe('<CartWidget /> component', () => {
	let view

	beforeEach(() => {
		view = render(
			<CartContext.Provider value={{ items: [], setItems }}>
				<BrowserRouter>
					<CartWidget />
				</BrowserRouter>
			</CartContext.Provider>
		)
	})

	it('renders empty state correctly', () => {
		expect(screen.getByText('0')).toBeInTheDocument()
		expect(screen.getByText('0').closest('a')).toHaveAttribute('href', '/cart')
	})

	it('renders cart total', () => {
		const { rerender } = view
		const total = calcTotal(products.items)

		rerender(
			<CartContext.Provider value={{ items: products.items, setItems }}>
				<BrowserRouter>
					<CartWidget />
				</BrowserRouter>
			</CartContext.Provider>
		)

		expect(screen.getByText(total)).toBeInTheDocument()
	})
})
