import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import CartProductGroups from './CartProductGroups'

import products from '../../../fixtures/products.json'

const [ product ] = products.items
const mockStore = configureStore([])

describe('<CartProductGroups /> component', () => {
	let store

	beforeEach(() => {
		store = mockStore({})

		render(
			<Provider store={store}>
				<CartProductGroups items={[ ...products.items ]} />
			</Provider>
		)
	})

	it('renders correctly', () => {
		expect(screen.getByText(product.origin)).toBeInTheDocument()
	})
})
