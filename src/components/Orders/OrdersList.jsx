import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import {
	getOrdersRequest,
	selectOrderIds,
	selectOrdersError,
	selectOrdersStatus
} from '../../store/orders/ordersSlice'

import classes from './OrdersList.module.sass'
import OrderCard from './OrderCard'

import * as settings from '../../constants/settings'

const OrdersList = () => {

	const dispatch = useDispatch()
	const location = useLocation()

	const orders = useSelector(selectOrderIds)
	const ordersStatus = useSelector(selectOrdersStatus)
	const error = useSelector(selectOrdersError)

	useEffect(() => {
		dispatch(getOrdersRequest())
	}, [ location, dispatch ]) // location?

	let content

	if (ordersStatus === settings.LOADING_STATUS) {
		content = <div>Loading...</div>
	} else if (ordersStatus === settings.SUCCESS_STATUS) {
		content = orders.map(id => (
			<OrderCard
				key={id}
				id={id}
			/>
		))
	} else if (ordersStatus === settings.FAILURE_STATUS) {
		content = <div>{error}</div>
	}

	const nothingFoundMessage = <h3>No orders found.</h3>

	return <section className={classes.layout}>
		{content?.length ? content : nothingFoundMessage}
	</section>
}

export default OrdersList
