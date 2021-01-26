import React from 'react'
import { useDispatch } from 'react-redux'

import { productAdded } from '../../../store/products/productsSlice'
import { messageAdded } from '../../../store/notifications/notificationsSlice'
import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'

import ProductForm from './ProductForm'

const CreateFormContainer = () => {

	const dispatch = useDispatch()

	const createProduct = async (product, resetForm) => {
		const updatedProduct = {
			product: {
				...product,
				price: Number(product.price)
			}
		}

		const { data } =
			await productsListApi.post(URIs.products, updatedProduct)

		if (data) {
			resetForm()
			dispatch(productAdded(data))
			dispatch(messageAdded(`${data.name} added.`))
		}
	}

	return <ProductForm handleProduct={createProduct} />
}

export default CreateFormContainer
