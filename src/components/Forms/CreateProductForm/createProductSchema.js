import { object, string, number } from 'yup'

export const productShape = {
	name: '',
	price: 0,
	origin: ''
}

export const productSchema = origins => {
	return object({
		name: string()
			.min(3, 'No less than three letters.')
			.max(20, 'No more than twenty letters.')
			.required(),
		price: number()
			.typeError('Have to be a numbah.')
			.positive()
			.required(),
		origin: string()
			.oneOf(origins, 'Please, enter valid origin.')
			.required()
	})
}
