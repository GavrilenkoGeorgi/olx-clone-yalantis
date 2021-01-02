import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { ProductsContext } from './ProductsContext'
import { ProductsList } from '../components/products'
import products from '../fixtures/products.json'

describe('Products context', () => {

	const renderWithContext = products => render(
		<ProductsContext.Provider value={{ products }}>
			<BrowserRouter>
				<ProductsList />
			</BrowserRouter>
		</ProductsContext.Provider>
	)

	it('shows all given products', () => {
		renderWithContext(products.items)

		const productNames = products.items.map(item => item.name)

		for (let name of productNames) {
			expect(screen.getByText(name)).toBeInTheDocument()
		}
	})
})
