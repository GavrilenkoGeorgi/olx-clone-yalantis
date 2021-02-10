import React from 'react'
import { useDispatch } from 'react-redux'
import { func } from 'prop-types'
import { productType } from '../../propTypes'

import { onEditProduct } from '../../../sagas/products'
import ProductForm from './ProductForm'

const EditFormContainer = ({ product, togglePortal }) => {

	const dispatch = useDispatch()

	const editProduct = async values => {
		const updatedProduct = {
			product: {
				...values,
				price: Number(values.price),
				id: product.id
			}
		}
		dispatch(onEditProduct(updatedProduct))
		togglePortal()
	}

	return <ProductForm handleProduct={editProduct} product={product}/>
}

EditFormContainer.propTypes = {
	product: productType.isRequired,
	togglePortal: func
}

export default EditFormContainer
