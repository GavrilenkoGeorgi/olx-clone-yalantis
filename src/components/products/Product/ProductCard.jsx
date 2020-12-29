import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { useCart } from '../../../context/CartContext'
import routes from '../../routes/routesConstants'

import classes from './ProductCard.module.sass'

const ProductCard = ({ product }) => {

	const { items, setItems } = useCart()

	const addProductToCart = product => {
		setItems([ ...items, product ])
	}

	return <div className={classes.card}>
		<h2>{product.name}</h2>
		<div className={classes.description}>
			<div>
				<span>Origin:</span> {product.origin}
			</div>
			<div>
				<span>Price:</span> {product.price}
			</div>
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
	</div>
}

ProductCard.propTypes = {
	product: PropTypes.object.isRequired
}

export default ProductCard
