import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CartContext } from './CartContext'
import { CartWidget } from '../components/widgets'
import products from '../fixtures/products.json'
import { calcTotal } from '../utils'
import { ProductsPage } from '../components/pages'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import routes from '../fixtures/apiRoutes'

const setItems = jest.fn()

const server = setupServer(
	rest.get(routes.products,
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json(products)
			)
		})
)

describe('Cart context', () => {
	beforeAll(() => server.listen())
	afterAll(() => server.close())
	afterEach(() => server.resetHandlers())

	const renderWithContext = items => render(
		<CartContext.Provider value={{ items, setItems }}>
			<BrowserRouter>
				<CartWidget />
				<ProductsPage />
			</BrowserRouter>
		</CartContext.Provider>
	)

	it('shows default context state', () => {
		renderWithContext([])
		expect(screen.getByText('0')).toBeInTheDocument()
	})

	it('total price is shown correctly for given products', () => {
		renderWithContext(products.items)
		const total = calcTotal(products.items)
		expect(screen.getByText(total)).toBeInTheDocument()
	})

	it('upon adding product to the cart context is correctly updated', async () => {
		const [ firstProduct, secondProduct ] = products.items
		renderWithContext([ firstProduct ])

		await waitFor(async () => {
			const selectedProduct = screen.getByText(secondProduct.name).closest('article')
			const addToCartBtn = within(selectedProduct).getByText('Add to cart')
			userEvent.click(addToCartBtn)

			expect(setItems).toHaveBeenCalledTimes(1)
			expect(setItems).toHaveBeenCalledWith([ firstProduct, secondProduct ])
		})
	})
})
