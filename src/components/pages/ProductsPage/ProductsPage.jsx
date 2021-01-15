import React from 'react'

import { ProductsList } from '../../products'
import classes from './ProductsPage.module.sass'

const ProductsPage = () => {

	return <section className={classes.content}>
		<h1>Products page</h1>
		<ProductsList />
	</section>
}

export default ProductsPage
