import { shape, number, string, bool, arrayOf, node, oneOfType } from 'prop-types'

export const product = shape({
	createdAt: string.isRequired,
	updatedAt: string.isRequired,
	id: string.isRequired,
	isEditable: bool.isRequired,
	name: string.isRequired,
	origin: string.isRequired,
	price: number.isRequired
})

export const productGroup = shape({
	origin: string.isRequired,
	products: arrayOf(product).isRequired
})

export const children = oneOfType([
	arrayOf(node),
	node
])

export const notification = shape({
	message: string.isRequired,
	variant: string
})
