import React from 'react'
import ProductCard from '../Product/ProductCard'

import { useProducts } from '../../../context/ProductsContext'
import classes from './ProductsList.module.sass'

const ProductsList = () => {

	const { products } = useProducts()

	return <section className={classes.layout}>
		{products.map(item => (
			<ProductCard
				key={item.id}
				product={item}
			/>
		))}
	</section>
}

export default ProductsList
