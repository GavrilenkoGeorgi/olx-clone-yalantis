import React from 'react'
import { useDispatch } from 'react-redux'

import { onAddProduct } from '../../../sagas/products'
import ProductForm from './ProductForm'

const CreateFormContainer = () => {

	const dispatch = useDispatch()

	const createProduct = async (product, resetForm) => {
		const newProduct = {
			product: {
				...product,
				price: Number(product.price)
			}
		}

		dispatch(onAddProduct(newProduct))
		resetForm()
	}

	return <ProductForm handleProduct={createProduct} />
}

export default CreateFormContainer
