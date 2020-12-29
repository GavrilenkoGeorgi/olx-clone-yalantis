import React, { useEffect, useState } from 'react'

import { useCart } from '../../../context/CartContext'
import { calcTotal, groupByOrigin } from '../../../utils'

import ProductGroups from './ProductGroups'
import classes from './CartPage.module.sass'

const CartPage = () => {

	const { items } = useCart()
	const [ groupedProducts, setGroupedProducts ] = useState([])

	useEffect(() => {
		setGroupedProducts([ ...groupByOrigin(items) ])
	}, [ items ])

	return <section className={classes.layout}>
		<h1>Cart</h1>
		<div className={classes.total}>
			<p>Total items: {items.length}</p>
			<p>Running total: {calcTotal(items)}</p>
		</div>
		<div className={classes.products}>
			{groupedProducts &&
				<ProductGroups groups={groupedProducts} />
			}
		</div>
	</section>
}

export default CartPage
