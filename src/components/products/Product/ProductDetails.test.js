import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Routes from '../../routes/Routes'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import products from '../../../fixtures/products.json'
import routes from '../../../fixtures/apiRoutes'

const [ product ] = products.items

const server = setupServer(
	rest.get(`${routes.products}/${product.id}`,
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json(product)
			)
		})
)

describe('ProductDetails component', () => {
	beforeAll(() => server.listen())
	afterEach(() => server.resetHandlers())
	afterAll(() => server.close())

	beforeEach(() => {
		render(
			<MemoryRouter
				initialEntries={
					[ `/products/${product.id}` ]}
				initialIndex={0}
			>
				<Routes />
			</MemoryRouter>
		)
	})

	it('renders and fetches product details', async () => {
		await waitFor(() => {
			expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument()
			expect(screen.getByText(product.name)).toBeInTheDocument()
			expect(screen.getByText(product.price)).toBeInTheDocument()
		})
	})
})
