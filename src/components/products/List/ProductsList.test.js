import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'

import ProductsList from './ProductsList'
import { ProductsContext } from '../../../context/ProductsContext'
import products from '../../../fixtures/products.json'

describe('<ProductsList /> component', () => {
	beforeEach(() => {
		render(
			<ProductsContext.Provider value={{ products: products.items }}>
				<BrowserRouter>
					<ProductsList />
				</BrowserRouter>
			</ProductsContext.Provider>
		)
	})

	it('correctly renders all products', () => {
		const [ , , thirdProduct ] = products.items
		const productNames = products.items.map(item => item.name)

		for (const name of productNames)
			expect(screen.getByText(name)).toBeInTheDocument()

		const productCard = screen.getByText(thirdProduct.name).closest('article')
		expect(within(productCard).getByText(thirdProduct.name)).toBeInTheDocument()
		expect(within(productCard).getByText(thirdProduct.origin)).toBeInTheDocument()
		expect(within(productCard).getByText(thirdProduct.price)).toBeInTheDocument()
		expect(within(productCard).getByText('Details...'))
			.toHaveAttribute('href', `/products/${thirdProduct.id}`)
	})
})
