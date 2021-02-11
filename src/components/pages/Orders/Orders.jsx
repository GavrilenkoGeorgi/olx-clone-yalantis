import React from 'react'
import { useInjectSaga } from '../../../hooks/useInjectSaga'
import { ordersSaga } from '../../../sagas/orders'

import OrdersList from '../../Orders/OrdersList'
import classes from './Orders.module.sass'

const Orders = () => {
	useInjectSaga('ordersSaga', ordersSaga)

	return <section className={classes.ordersLayout}>
		<h1>Orders!!</h1>
		<article>
			<OrdersList />
		</article>
	</section>
}

export default Orders
