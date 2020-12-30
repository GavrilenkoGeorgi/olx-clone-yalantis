import React, { useMemo } from 'react'

import { useCart } from '../../../context/CartContext'
import { calcTotal, groupByOrigin } from '../../../utils'

import ProductGroups from './ProductGroups'
import BackButton from '../../widgets/BackButton/BackButton'
import classes from './CartPage.module.sass'

const CartPage = () => {

	const { items } = useCart()
	// not sure about this (
	const memoizedGroups = useMemo(() => groupByOrigin(items), [ items ])
	const memoizedTotal = useMemo(() => calcTotal(items), [ items ])

	return <section className={classes.layout}>
		<BackButton />
		<h1>Cart</h1>
		<div className={classes.total}>
			<p>Total items: {items.length}</p>
			<p>Running total: {memoizedTotal}</p>
		</div>
		<div className={classes.products}>
			<ProductGroups groups={memoizedGroups} />
		</div>
	</section>
}

export default CartPage
