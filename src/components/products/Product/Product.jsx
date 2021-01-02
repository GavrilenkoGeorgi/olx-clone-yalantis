import React from 'react'
import { productType } from '../../propTypes'

import classes from './Product.module.sass'

const Product = ({ product }) => {

	const formatDate = dateString => {
		const date = new Date(dateString)

		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}
		return <span>{date.toLocaleString('en-us', options)}</span>
	}

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
				{formatDate(product.createdAt)}
			</div>
		</article>
	</>
}

Product.propTypes = {
	product: productType.isRequired
}

export default Product
