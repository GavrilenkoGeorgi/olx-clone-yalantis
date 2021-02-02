import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectSigleOrderDetails } from '../../../store/orders/ordersSlice'
import { onGetOrderDetails } from '../../../sagas/orders'

import { pureObjectIsEmpty } from '../../../utils/utils'

const OrderDetails = () => {

	const { id } = useParams()
	const dispatch = useDispatch()
	const order = useSelector(state => selectSigleOrderDetails(state))

	useEffect(() => {
		dispatch(onGetOrderDetails(id))
	}, [ dispatch, id ])

	if (!pureObjectIsEmpty(order)) {
		return <section>
			<h1>Order details</h1>
			<ul>
				<li>
					ID: {order.id}
				</li>
				<li>
					Created At: {order.createdAt}
				</li>
				<li>
					Contains: {order.pieces.length} pcs.
				</li>
			</ul>
		</section>
	}

	return <p>Loading data for: {id}</p>
}

export default OrderDetails
