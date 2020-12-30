import React, { useEffect, useState } from 'react'
import ProductsList from '../../products/List/ProductsList'
import { productsListApi } from '../../../api/productsApi'
import URIs from '../../../api/URIs'
import ProductsContext from '../../../context/ProductsContext'
import classes from './ProductsPage.module.sass'

const ProductsPage = () => {

	const [ products, setProducts ] = useState(null)

	useEffect(() => {
		productsListApi.get(URIs.products)
			.then(response => {
				setProducts(response.data.items)
			})
	}, [])

	return <section className={classes.content}>
		<h1>Products page</h1>
		<ProductsContext.Provider value={products}>
			<ProductsList />
		</ProductsContext.Provider>
	</section>
}

export default ProductsPage
