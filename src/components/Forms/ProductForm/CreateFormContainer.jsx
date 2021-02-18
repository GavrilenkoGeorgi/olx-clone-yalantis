import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { func } from 'prop-types'

import { onAddProduct } from '../../../sagas/products'
import { selectProductsStatus } from '../../../store/products/productsSlice'

import { SUCCESS_STATUS } from '../../../constants/settings'
import ProductForm from './ProductForm'

const CreateFormContainer = ({ togglePortal }) => {

	const dispatch = useDispatch()

	const status = useSelector(state => selectProductsStatus(state))
	const [ created, setCreated ] = useState(false)

	const createProduct = async product => {
		const newProduct = {
			product: {
				...product,
				price: Number(product.price)
			}
		}

		dispatch(onAddProduct(newProduct))
		setCreated(true)
	}

	useEffect(() => {
		if (created && status === SUCCESS_STATUS) {
			togglePortal()
		}
	}, [ created, status, togglePortal ])

	return <ProductForm handleProduct={createProduct} />
}

CreateFormContainer.propTypes = {
	togglePortal: func
}

export default CreateFormContainer
