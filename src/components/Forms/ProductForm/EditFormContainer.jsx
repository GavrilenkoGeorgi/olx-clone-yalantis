import React from 'react'
import { useDispatch } from 'react-redux'
import { productType } from '../../propTypes'

import ProductForm from './ProductForm'

import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'

import { productEdited } from '../../../store/products/productsSlice'
import { messageAdded } from '../../../store/notifications/notificationsSlice'

const EditFormContainer = ({ product }) => {

	const dispatch = useDispatch()

	const editProduct = async values => {
		const updatedProduct = {
			product: {
				...values,
				price: Number(values.price)
			}
		}

		const { data } =
			await productsListApi.patch(`${URIs.products}/${product.id}`, updatedProduct)

		if (data) {
			const { id, name } = data
			dispatch(productEdited({ id, changes: data }))
			dispatch(messageAdded(`${name} changes have been saved.`))
		}
	}

	return <ProductForm handleProduct={editProduct} product={product}/>
}

EditFormContainer.propTypes = {
	product: productType.isRequired
}

export default EditFormContainer
