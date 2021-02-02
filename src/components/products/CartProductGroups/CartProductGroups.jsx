import React from 'react'
import { useDispatch } from 'react-redux'
import { arrayOf } from 'prop-types'
import { productType } from '../../propTypes'

import { onAddOrder } from '../../../sagas/orders'
import { cartEmptied } from '../../../store/cart/cartSlice'

import { Button } from '../../UI'
import ProductGroup from './ProductGroup/ProductGroup'
import classes from './CartProductGroups.module.sass'

const CartProductGroups = ({ items }) => {

	const dispatch = useDispatch()

	const orderPieces = items.map(item => ({ productId: item.id, count: item.quantity }))
	const data = {
		order: {
			pieces: orderPieces
		}
	}

	const handleOrder = () => {
		dispatch(onAddOrder(data))
		dispatch(cartEmptied())
	}

	if (!items.length)
		return <div className={classes.emptyCart}>
			Your cart is empty.
		</div>

	return <section>
		<div className={classes.cart}>
			{items.map(item => (
				<ProductGroup
					key={item.id}
					product={item}
				/>
			))}
		</div>
		<div className={classes.controls}>
			<Button clicked={() => handleOrder()} label="ORDER" />
		</div>
	</section>
}

CartProductGroups.propTypes = {
	items: arrayOf(productType)
}

CartProductGroups.defaultProps = {
	items: []
}

export default CartProductGroups
