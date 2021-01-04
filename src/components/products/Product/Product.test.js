import React from 'react'
import { render, screen, within } from '@testing-library/react'

import Product from './Product'
import products from '../../../fixtures/products.json'
import { formatDate } from '../../../utils'

const [ product ] = products.items

describe('<Product /> component', () => {
	beforeEach(() => {
		render(
			<Product product={product} />
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
