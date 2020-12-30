import React, { useEffect, useState, useCallback } from 'react'

import useAxios from '../../../hooks/useAxios'
import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'
import ProductsContext from '../../../context/ProductsContext'

import ProductsList from '../../products/List/ProductsList'
import classes from './ProductsPage.module.sass'

const ProductsPage = () => {

	const [ products, setProducts ] = useState(null)

	const { response } = useAxios({
		api: productsListApi,
		method: 'get',
		url: URIs.products
	})

	const handleProducts = useCallback(items => {
		setProducts(items)
	}, [ setProducts ])

	useEffect(() => {
		if (response) handleProducts(response.items)
	}, [ response, handleProducts ])

	return <section className={classes.content}>
		<h1>Products page</h1>
		<ProductsContext.Provider value={products}>
			<ProductsList />
		</ProductsContext.Provider>
	</section>
}

export default ProductsPage
