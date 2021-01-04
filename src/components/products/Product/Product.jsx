import React from 'react'
import { productType } from '../../propTypes'
import { formatDate } from '../../../utils'

import classes from './Product.module.sass'

const Product = ({ product }) => {

	const date = formatDate(product.createdAt)

	return <>
		<h1>Product details</h1>
		<article className={classes.layout}>
			<h2>{product.name}</h2>
			<div className={classes.details}>
				<p>
					Origin: <span>{product.origin}</span>
				</p>
				<p>
					Price: <span>{product.price}</span>
				</p>
			</div>
			<div className={classes.date}>
				<span>{date}</span>
			</div>
		</article>
	</>
}

Product.propTypes = {
	product: productType.isRequired
}

export default Product
