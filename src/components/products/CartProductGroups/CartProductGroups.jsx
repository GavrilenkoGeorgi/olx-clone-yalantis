import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { arrayOf } from 'prop-types'
import { productType } from '../../propTypes'

import routes from '../../routes/routesConstants'
import { postOrder, selectLastAddedId } from '../../../store/orders/ordersSlice'
import { cartEmptied } from '../../../store/cart/cartSlice'

import { Button } from '../../UI'
import ProductGroup from './ProductGroup/ProductGroup'
import classes from './CartProductGroups.module.sass'

const CartProductGroups = ({ items }) => {

	const dispatch = useDispatch()
	const history = useHistory()
	const lastId = useSelector(selectLastAddedId)

	const orderPieces = items.map(item => ({ productId: item.id, count: item.quantity }))
	const data = {
		order: {
			pieces: orderPieces
		}
	}

	const handleOrder = () => {
		dispatch(postOrder(data))
		dispatch(cartEmptied())
	}

	useEffect(() => {
		if (lastId){
			history.push(`${routes.orders}/${lastId}`)
		}
	}, [ lastId, history ])

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
