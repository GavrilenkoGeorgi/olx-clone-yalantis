import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import {
	selectProductIds,
	selectProductsStatus,
	selectProductsError
} from '../../../store/products/productsSlice'
import { onGetProducts } from '../../../sagas/products'

import routes from '../../routes/routesConstants'
import * as settings from '../../../constants/settings'
import { editableParam } from '../../../utils'

import ProductCard from '../Product/ProductCard'
import classes from './ProductsList.module.sass'


const ProductsList = () => {

	const location = useLocation()
	const dispatch = useDispatch()

	const orderedProductIds = useSelector(selectProductIds)
	const productsStatus = useSelector(selectProductsStatus)
	const error = useSelector(selectProductsError)
	const editable = location.pathname === routes.productsCreated ? true : false

	const makeQuery = useCallback((editable, search) => {
		const isEditable = editableParam(editable, search)

		if (search) return `${location.search}${isEditable}`
		else if (editable && !search) return isEditable
		else return ''

	}, [ location.search ])

	useEffect(() => {
		const query = makeQuery(editable, location.search)
		dispatch(onGetProducts(query))
	}, [ location, dispatch, editable, makeQuery ])

	let content = []
	const idleStatuses = [ settings.IDLE_STATUS, settings.SUCCESS_STATUS ]

	if (productsStatus === settings.LOADING_STATUS) {
		<div>Loading...</div>
	} else if (idleStatuses.includes(productsStatus)) {
		content = orderedProductIds.map(productId => (
			<ProductCard
				key={productId}
				productId={productId}
			/>
		))
	} else if (productsStatus === settings.FAILURE_STATUS) {
		content = <div>{error}</div>
	}

	const nothingFoundMessage = <h3>No products found with given params.</h3>

	return <section className={classes.layout}>
		{content.length ? content : nothingFoundMessage}
	</section>
}

export default ProductsList
