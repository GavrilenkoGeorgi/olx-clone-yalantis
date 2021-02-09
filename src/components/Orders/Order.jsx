import React from 'react'
import { orderType } from '../propTypes'

import { Link } from 'react-router-dom'
import routes from '../routes/routesConstants'

import classes from './Order.module.sass'

const Order = ({ order }) => {

	const { pieces } = order

	const total = price =>
		new Intl.NumberFormat('ua-UA', { style: 'currency', currency: 'UAH' })
			.format(price)

	const humanReadableDate = dateString => {
		const date = new Date(dateString)
		const options = { weekday: 'short', month: 'long', year: 'numeric', day: 'numeric' }
		return Intl.DateTimeFormat('ua-UA', options).format(date)
	}

	return <div className={classes.container}>
		<Link to={`${routes.orders}/${order.id}`}>
			{order.id.substring(0,8)}
		</Link>
		<p>
			<strong><em>
				{humanReadableDate(order.createdAt)}
			</em></strong>
		</p>
		<div>
			Num of pieces {pieces.length}
			{pieces.map(({ id, count, product }) => (
				<ul key={id}>
					<li>
						Name: {product.name}
					</li>
					<li>
						Origin: {product.origin}
					</li>
					<li>
						Price: {product.price} x {count} = {total(product.price * count)}
					</li>
				</ul>
			))}
		</div>
	</div>
}

Order.propTypes = {
	order: orderType.isRequired,
}

export default Order
