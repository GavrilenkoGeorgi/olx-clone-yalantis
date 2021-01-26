import React from 'react'
import OrdersList from '../../Orders/OrdersList'

const Orders = () => {

	console.log('[Orders.js]')

	return <section>
		<h1>Orders!!</h1>
		<article>
			<OrdersList />
		</article>
	</section>
}

export default Orders
