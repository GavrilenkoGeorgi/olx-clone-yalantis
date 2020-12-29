import React, { useContext } from 'react'
import ProductCard from '../Product/ProductCard'

import ProductsContext from '../../../context/ProductsContext'
import classes from './ProductsList.module.sass'

const ProductsList = () => {

	const products = useContext(ProductsContext)

	return <section className={classes.layout}>
		{products?.map(item => (
			<ProductCard
				key={item.id}
				product={item}
			/>
		))}
	</section>
}

export default ProductsList
