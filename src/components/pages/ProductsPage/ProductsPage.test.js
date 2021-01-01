import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, waitFor, within } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import ProductsPage from './ProductsPage'
import products from '../../../fixtures/products.json'
import routes from '../../../fixtures/apiRoutes'

const server = setupServer(
	rest.get(routes.products,
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json(products)
			)
		})
)

describe('<ProductsPage /> component', () => {
	beforeAll(() => server.listen())
	afterAll(() => server.close())
	afterEach(() => server.resetHandlers())

	beforeEach(() => {
		render(
			<BrowserRouter>
				<ProductsPage />
			</BrowserRouter>
		)
	})

	it('renders correctly and shows all products', async () => {
		await waitFor(() => {
			const productNames = products.items.map(item => item.name)
			for (let name of productNames) {
				expect(screen.getByText(name)).toBeInTheDocument()
			}
		})
	})

	it('product card renders correctly', async () => {
		await waitFor(() => {
			const [ product ] = products.items

			const productCard = screen.getByText(product.name).closest('article')
			expect(productCard).toBeInTheDocument()
			expect(within(productCard).getByText(product.price)).toBeInTheDocument()

			const detailsLink = within(productCard).getByText('Details...')
			expect(detailsLink).toHaveAttribute('href', `/products/${product.id}`)

			expect(within(productCard).getByText('Add to cart')).toBeInTheDocument()
		})
	})
})
