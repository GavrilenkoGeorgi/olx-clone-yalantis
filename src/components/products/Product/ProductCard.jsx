import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { useCart } from '../../../context/CartContext'
import routes from '../../routes/routesConstants'
import { saveData as saveCartItems } from '../../../utils'

import classes from './ProductCard.module.sass'

const ProductCard = ({ product }) => {

	const { items, setItems } = useCart()

	const addProductToCart = product => {
		const cartContents = [ ...items, product ]
		setItems(cartContents)
		saveCartItems(cartContents)
	}

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
			<button
				className={classes.addBtn}
				onClick={() => addProductToCart(product)}
			>
				Add to cart
			</button>
			<Link to={`${routes.products}/${product.id}`}>Details...</Link>
		</div>
	</article>
}

ProductCard.propTypes = {
	product: PropTypes.object.isRequired
}

export default ProductCard
