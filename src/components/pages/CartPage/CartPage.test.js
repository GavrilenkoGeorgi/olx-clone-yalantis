import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'

import { calcTotal } from '../../../utils'
import { CartContext } from '../../../context/CartContext'
import { CartPage } from '../'
import products from '../../../fixtures/products.json'

const setItems = jest.fn()

describe('<CartPage />', () => {
	render(
		<CartContext.Provider value={{ items: products.items, setItems }}>
			<BrowserRouter>
				<CartPage />
			</BrowserRouter>
		</CartContext.Provider>
	)

	it('renders correctly', () => {
		const total = calcTotal(products.items)

		expect(screen.getByText(`Total items: ${products.items.length}`))
			.toBeInTheDocument()
		expect(screen.getByText(`Running total: ${total}`))
			.toBeInTheDocument()

		const [ firstProduct, secondProduct, thirdProduct ] = products.items

		const firstGroup = screen.getByText(firstProduct.origin).closest('div')
		expect(within(firstGroup).getByText(firstProduct.price)).toBeInTheDocument()
		expect(within(firstGroup).getByText('1 pcs')).toBeInTheDocument()

		const secondGroup = screen.getByText(secondProduct.origin).closest('div')
		expect(within(secondGroup).getByText(secondProduct.price + thirdProduct.price))
			.toBeInTheDocument()
		expect(within(secondGroup).getByText('2 pcs')).toBeInTheDocument()
	})
})
