import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	fetchOrders,
	selectOrderIds,
	selectOrdersError,
	selectOrdersStatus
} from '../../store/orders/ordersSlice'

import classes from './OrdersList.module.sass'
import OrderCard from './OrderCard'

const OrdersList = () => {

	const dispatch = useDispatch()

	const orders = useSelector(selectOrderIds)
	const ordersStatus = useSelector(selectOrdersStatus)
	const error = useSelector(selectOrdersError)

	useEffect(() => {
		if (ordersStatus === 'idle') {
			dispatch(fetchOrders())
		}
	}, [ ordersStatus, dispatch ])

	let content

	if (ordersStatus === 'loading') {
		content = <div>Loading...</div>
	} else if (ordersStatus === 'succeeded') {
		content = orders.map(id => (
			<OrderCard
				key={id}
				id={id}
			/>
		))
	} else if (ordersStatus === 'failed') {
		content = <div>{error}</div>
	}

	const nothingFoundMessage = <h3>No orders found.</h3>

	return <section className={classes.layout}>
		{content?.length ? content : nothingFoundMessage}
	</section>
}

export default OrdersList
