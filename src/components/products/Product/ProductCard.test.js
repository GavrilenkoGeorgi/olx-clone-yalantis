import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'

import ProductCard from './ProductCard'
import products from '../../../fixtures/products.json'

const [ product ] = products.items

describe('<ProductsListComponent />', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<ProductCard product={product} />
			</BrowserRouter>
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText(product.name)).toBeInTheDocument()

		const productOrigin = screen.getByText('Origin:').closest('p')
		expect(within(productOrigin).getByText(product.origin)).toBeInTheDocument()

		const productPrice = screen.getByText('Price:').closest('p')
		expect(within(productPrice).getByText(product.price)).toBeInTheDocument()

		expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument()
		expect(screen.getByText('Details...')).toHaveAttribute('href', `/products/${product.id}`)
	})
})
