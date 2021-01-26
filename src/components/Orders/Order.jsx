import React from 'react'
import { orderType } from '../propTypes/'

const Order = ({ order }) => {

	console.log('[Order]', order)

	return <div>
		Created at {order.createdAt}
	</div>
}

Order.propTypes = {
	order: orderType.isRequired,
}

export default Order
