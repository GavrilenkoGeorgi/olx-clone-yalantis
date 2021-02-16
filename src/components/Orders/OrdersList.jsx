import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import {
	selectOrderIds,
	selectOrdersError,
	selectOrdersStatus
} from '../../store/orders/ordersSlice'
import { onGetOrders } from '../../sagas/orders'

import { Article } from './OrderListStyle'
import OrderCard from './OrderCard'

import * as settings from '../../constants/settings'

const OrdersList = () => {

	const dispatch = useDispatch()
	const location = useLocation()

	const orders = useSelector(selectOrderIds)
	const ordersStatus = useSelector(selectOrdersStatus)
	const error = useSelector(selectOrdersError)

	useEffect(() => {
		dispatch(onGetOrders())
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

	return <Article>
		{content?.length ? content : nothingFoundMessage}
	</Article>
}

export default OrdersList
