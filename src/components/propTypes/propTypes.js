import { shape, number, string, bool, arrayOf, node, oneOfType } from 'prop-types'

export const productType = shape({
	createdAt: string.isRequired,
	updatedAt: string.isRequired,
	id: string.isRequired,
	isEditable: bool.isRequired,
	name: string.isRequired,
	origin: string.isRequired,
	price: number.isRequired,
	quantity: number
})

export const children = oneOfType([
	arrayOf(node),
	node
])

export const notification = shape({
	message: string.isRequired,
	variant: string
})

export const orderPiece = shape({
	id: string.isRequired,
	count: number.isRequired,
	product: productType.isRequired
})

export const orderType = shape({
	id: string.isRequired,
	createdAt: string,
	pieces: arrayOf(orderPiece)
})
