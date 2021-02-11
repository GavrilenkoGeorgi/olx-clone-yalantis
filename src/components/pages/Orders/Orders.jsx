import React from 'react'
import OrdersList from '../../Orders/OrdersList'

import classes from './Orders.module.sass'

const Orders = () => {

	return <section className={classes.ordersLayout}>
		<h1>Orders</h1>
		<article>
			<OrdersList />
		</article>
	</section>
}

export default Orders
