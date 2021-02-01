import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Routes from '../../routes/Routes'
import products from '../../../fixtures/products.json'
import routes from '../../../fixtures/apiRoutes'

const [ product ] = products.items
const mockStore = configureStore([])

const server = setupServer(
	rest.get(`${routes.products}/${product.id}`,
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json(product)
			)
		})
)

describe('<ProductDetails /> component', () => {
	let store

	beforeAll(() => server.listen())
	afterEach(() => server.resetHandlers())
	afterAll(() => server.close())

	beforeEach(() => {
		store = mockStore({
			products: {
				ids: [ product.id ],
				entities: { [ product.id ]: product }
			}
		})

		render(
			<Provider store={store}>
				<MemoryRouter
					initialEntries={
						[ `/product/${product.id}` ]}
					initialIndex={0}
				>
					<Routes />
				</MemoryRouter>
			</Provider>
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
