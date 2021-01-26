import React from 'react'
import { orderType } from '../propTypes'

import { Link } from 'react-router-dom'
import routes from '../routes/routesConstants'

const Order = ({ order }) => {

	return <div>
		<p>Created at {order.createdAt}</p>
		<Link to={`${routes.orders}/${order.id}`}>{order.id}</Link>
	</div>
}

Order.propTypes = {
	order: orderType.isRequired,
}

export default Order
