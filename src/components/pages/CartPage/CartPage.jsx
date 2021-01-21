import React from 'react'
import { useSelector } from 'react-redux'

import { selectAllItems, selectTotal } from '../../../store/cart/cartSlice'

import { CartProductGroups } from '../../products'
import { BackButton } from '../../widgets'
import classes from './CartPage.module.sass'

const CartPage = () => {

	const items = useSelector(selectAllItems)
	const total = useSelector(selectTotal)

	return <section className={classes.layout}>
		<BackButton />
		<h1>Cart</h1>
		<div className={classes.total}>
			<p>Total items: {items.length}</p>
			<p>Running total: {total}</p>
		</div>
		<div className={classes.products}>
			<CartProductGroups items={items} />
		</div>
	</section>
}

export default CartPage
