import React from 'react'
import { useDispatch } from 'react-redux'
import { productType } from '../../propTypes'

import ProductForm from './ProductForm'

import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'

import { messageAdded } from '../../../store/notifications/notificationsSlice'

const EditFormContainer = ({ product }) => {

	const dispatch = useDispatch()

	const editProduct = async (values, resetForm) => {
		const data = {
			product: {
				...values,
				price: Number(values.price)
			}
		}

		const response =
			await productsListApi.patch(`${URIs.products}/${product.id}`, data)

		if (response) {
			resetForm()
			dispatch(messageAdded('Product edits have been saved.'))
		}
	}

	return <ProductForm handleProduct={editProduct} product={product}/>
}

EditFormContainer.propTypes = {
	product: productType.isRequired
}

export default EditFormContainer
