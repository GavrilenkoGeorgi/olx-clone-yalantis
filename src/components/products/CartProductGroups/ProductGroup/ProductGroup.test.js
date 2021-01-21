import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { groupByOrigin } from '../../../../utils'
import products from '../../../../fixtures/products.json'

import ProductGroup from './ProductGroup'

const mockStore = configureStore([])

const groups = groupByOrigin(products.items)
const [ group ] = groups
const groupTotal = group.products.reduce((acc, curr) => acc += curr.price, 0)
const [ product ] = products.items

describe('<ProductGroup /> component', () => {
	let store
	beforeEach(() => {
		store = mockStore({})

		render(
			<Provider store={store}>
				<ProductGroup product={product} />
			</Provider>
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText(group.origin)).toBeInTheDocument()
		expect(screen.getByText(`${group.products.length} pcs`)).toBeInTheDocument()
		expect(screen.getByText(groupTotal)).toBeInTheDocument()
	})
})
