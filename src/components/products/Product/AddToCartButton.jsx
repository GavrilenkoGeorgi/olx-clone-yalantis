import React from 'react'
import { productType } from '../../propTypes'

import { useCart } from '../../../context/CartContext'
import { saveData as saveCartItems } from '../../../utils'
import classes from './AddToCartButton.module.sass'

const AddToCartButton = ({ product }) => {

	const { items, setItems } = useCart()

	const addProductToCart = product => {
		const cartContents = [ ...items, product ]
		setItems(cartContents)
		saveCartItems(cartContents)
	}

	return <button className={classes.addBtn}
		onClick={() => addProductToCart(product)}
	>
		Add to cart
	</button>
}

AddToCartButton.propTypes = {
	product: productType.isRequired
}

export default AddToCartButton
