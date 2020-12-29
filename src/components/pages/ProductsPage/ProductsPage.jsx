import React, { useEffect, useState } from 'react'
import ProductsList from '../../products/List/ProductsList'
import { productsListApi } from '../../../api/productsApi'
import ProductsContext from '../../../context/ProductsContext'
import classes from './ProductsPage.module.sass'

const ProductsPage = () => {

	const [ products, setProducts ] = useState(null)

	useEffect(() => {
		productsListApi.get('/products')
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
