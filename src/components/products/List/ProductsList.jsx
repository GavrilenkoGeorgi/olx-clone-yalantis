import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { fetchProducts, selectProductIds } from '../../../store/products/productsSlice'

import ProductCard from '../Product/ProductCard'
import classes from './ProductsList.module.sass'

const ProductsList = () => {

	const location = useLocation()
	const dispatch = useDispatch()

	const orderedProductIds = useSelector(selectProductIds)
	const productsStatus = useSelector(state => state.products.status)
	const error = useSelector(state => state.products.error)

	useEffect(() => {
		if (productsStatus === 'idle') {
			dispatch(fetchProducts())
		}
	}, [ productsStatus, dispatch ])

	useEffect(() => {
		dispatch(fetchProducts(location.search))
	}, [ location, dispatch ])

	let content

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

	return <section className={classes.layout}>
		{content}
	</section>
}

ProductsList.propTypes = {
	query: PropTypes.string.isRequired
}

export default ProductsList
