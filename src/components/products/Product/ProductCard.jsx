import React from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'
import { useSelector } from 'react-redux'

import routes from '../../routes/routesConstants'

import { useDispatch } from 'react-redux'
import { itemAdded } from '../../../store/cart/cartSlice'

import { Button, PortalButton } from '../../UI'
import { EditFormContainer } from '../../Forms'
import classes from './ProductCard.module.sass'
import { selectProductById } from '../../../store/products/productsSlice'
import { onDeleteProduct } from '../../../sagas/products'

const ProductCard = ({ productId }) => {

	const dispatch = useDispatch()
	const product = useSelector(state => selectProductById(state, productId))

	const addProductToCart = () => {
		dispatch(itemAdded(product))
	}

	const DetailsLink = () =>
		<Link to={`${routes.product}/${product.id}`}>Details...</Link>

	const MemodDetailsLink = React.memo(DetailsLink)

	const handleDelete = () => {
		dispatch(onDeleteProduct(product.id))
	}

	const controls = <>
		<PortalButton
			title="Edit product"
			btnLabel="Edit"
		>
			<EditFormContainer product={product}/>
		</PortalButton>
		<Button
			label="Delete"
			clicked={() => handleDelete()}/>
	</>

	const addToCartBtn = <Button
		label="Add to cart"
		clicked={addProductToCart}/>

	const buttons = editable => editable ? controls : addToCartBtn

	return <article className={classes.card}>
		<strong>{product.name}</strong>
		<div className={classes.description}>
			<p>
				Origin: <span className={classes.info}>{product.origin}</span>
			</p>
			<p>
				Price: <span>{product.price}</span>
			</p>
		</div>
		<div className={classes.controls}>
			{buttons(product.isEditable)}
			<MemodDetailsLink />
		</div>
	</article>
}

ProductCard.propTypes = {
	productId: string.isRequired
}

export default React.memo(ProductCard)
