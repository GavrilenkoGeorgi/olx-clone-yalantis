import React from 'react'
import { useDispatch } from 'react-redux'
import { productType } from '../../propTypes'

import { itemAdded } from '../../../store/cart/cartSlice'

import classes from './AddToCartButton.module.sass'

const AddToCartButton = ({ product }) => {

	const dispatch = useDispatch()

	const addProductToCart = () => {
		dispatch(itemAdded(product))
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
