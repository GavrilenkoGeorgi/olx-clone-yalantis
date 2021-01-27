import React from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'
import { useSelector } from 'react-redux'

import routes from '../../routes/routesConstants'

import AddToCartButton from './AddToCartButton'
import classes from './ProductCard.module.sass'
import { selectProductById } from '../../../store/products/productsSlice'

const ProductCard = ({ productId }) => {

	const product = useSelector(state => selectProductById(state, productId))

	const DetailsLink = () =>
		<Link to={`${routes.products}/${product.id}`}>Details...</Link>

	const MemodDetailsLink = React.memo(DetailsLink)

	return <article className={classes.card}>
		<h2>{product.name}</h2>
		<div className={classes.description}>
			<p>
				Origin: <span className={classes.info}>{product.origin}</span>
			</p>
			<p>
				Price: <span>{product.price}</span>
			</p>
		</div>
		<div className={classes.controls}>
			<AddToCartButton product={product} />
			<MemodDetailsLink />
		</div>
	</article>
}

ProductCard.propTypes = {
	productId: string.isRequired
}

export default React.memo(ProductCard)
