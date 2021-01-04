import React from 'react'
import { render, screen } from '@testing-library/react'
import CartProductGroups from './CartProductGroups'

import { groupByOrigin } from '../../../utils'
import products from '../../../fixtures/products.json'

const groups = groupByOrigin(products.items)

describe('<CartProductGroups /> component', () => {
	beforeEach(() => {
		render(
			<CartProductGroups groups={groups} />
		)
	})

	it('renders correctly', () => {
		const [ firstGroup, secondGroup ] = groups

		expect(screen.getByText(firstGroup.origin)).toBeInTheDocument()
		expect(screen.getByText(secondGroup.origin)).toBeInTheDocument()
		expect(screen.getByText(`${firstGroup.products.length} pcs`)).toBeInTheDocument()
		expect(screen.getByText(`${secondGroup.products.length} pcs`)).toBeInTheDocument()
	})
})
