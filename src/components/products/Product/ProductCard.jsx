import React from 'react'
import { Link } from 'react-router-dom'
import { productType } from '../../propTypes'

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
			<button
				className={classes.addBtn}
				onClick={() => addProductToCart(product)}
			>
				Add to cart
			</button>
			<MemodDetailsLink />
		</div>
	</article>
}

ProductCard.propTypes = {
	product: productType.isRequired
}

export default React.memo(ProductCard)
