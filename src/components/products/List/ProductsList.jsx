import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import {
	fetchProducts,
	selectProductIds,
	selectProductsStatus,
	selectProductsError
} from '../../../store/products/productsSlice'

import ProductCard from '../Product/ProductCard'
import classes from './ProductsList.module.sass'

const ProductsList = () => {

	const location = useLocation()
	const dispatch = useDispatch()

	const orderedProductIds = useSelector(selectProductIds)
	const productsStatus = useSelector(selectProductsStatus)
	const error = useSelector(selectProductsError)

	useEffect(() => {
		if (productsStatus === 'idle') {
			dispatch(fetchProducts())
		}
	}, [ productsStatus, dispatch ])

	useEffect(() => {
		dispatch(fetchProducts(location.search))
	}, [ location, dispatch ])

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
