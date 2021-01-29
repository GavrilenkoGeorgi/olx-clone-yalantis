import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import {
	selectProductIds,
	selectProductsStatus,
	selectProductsError,
	getProductsRequest
} from '../../../store/products/productsSlice'
import routes from '../../routes/routesConstants'

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
		if (search) return `?editable=${editable}&${location.search.substring(1)}`
		else return `?editable=${editable}`
	}, [ location.search ])

	useEffect(() => {
		dispatch(getProductsRequest(`?editable=${editable}`))
	}, [ dispatch, editable ])

	useEffect(() => {
		// filtered fetch
		const query = makeQuery(editable, location.search)
		dispatch(getProductsRequest(query))
	}, [ location, dispatch, editable, makeQuery ])

	let content = []

	if (productsStatus === 'loading') {
		<div>Loading...</div>
	} else if (productsStatus === 'succeeded') {
		content = orderedProductIds.map(productId => (
			<ProductCard
				key={productId}
				productId={productId}
			/>
		))
	} else if (productsStatus === 'failed') {
		content = <div>{error}</div>
	}

	const nothingFoundMessage = <h3>No products found with given params.</h3>

	return <section className={classes.layout}>
		{content.length ? content : nothingFoundMessage}
	</section>
}

export default ProductsList
