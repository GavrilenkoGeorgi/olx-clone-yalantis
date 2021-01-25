import React from 'react'
import { useDispatch } from 'react-redux'

import { messageAdded } from '../../../store/notifications/notificationsSlice'
import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'

import ProductForm from './ProductForm'

const CreateFormContainer = () => {

	const dispatch = useDispatch()

	const createProduct = async (product, resetForm) => {
		const data = {
			product: {
				...product,
				price: Number(product.price)
			}
		}

		const response =
			await productsListApi.post(URIs.products, data)

		if (response) {
			resetForm()
			dispatch(messageAdded('New product added.'))
		}
	}

	return <ProductForm handleProduct={createProduct} />
}

export default CreateFormContainer
