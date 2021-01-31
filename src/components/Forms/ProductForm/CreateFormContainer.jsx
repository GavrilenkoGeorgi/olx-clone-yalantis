import React from 'react'
import { useDispatch } from 'react-redux'

import { addProductRequest } from '../../../store/products/productsSlice'
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

		dispatch(addProductRequest(newProduct))
		resetForm()
	}

	return <ProductForm handleProduct={createProduct} />
}

export default CreateFormContainer
