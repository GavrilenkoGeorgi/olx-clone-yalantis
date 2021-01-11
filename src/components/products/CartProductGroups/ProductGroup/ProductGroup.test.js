import React from 'react'
import { render, screen } from '@testing-library/react'

import { groupByOrigin } from '../../../../utils'
import products from '../../../../fixtures/products.json'

import ProductGroup from './ProductGroup'

const groups = groupByOrigin(products.items)
const [ group ] = groups
const groupTotal = group.products.reduce((acc, curr) => acc += curr.price, 0)

describe('<ProductGroup /> component', () => {
	beforeEach(() => {
		render(
			<ProductGroup group={group} />
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText(group.origin)).toBeInTheDocument()
		expect(screen.getByText(`${group.products.length} pcs`)).toBeInTheDocument()
		expect(screen.getByText(groupTotal)).toBeInTheDocument()
	})
})
