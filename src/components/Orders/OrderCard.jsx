import React from 'react'
import { useSelector } from 'react-redux'
import { string } from 'prop-types'

import { selectOrderById } from '../../store/orders/ordersSlice'

import Order from './Order'

const OrderCard = ({ id }) => {

	console.log('Order Card', id)
	const order = useSelector(state => selectOrderById(state, id))

	if (!order) return <p>Order not found: {id}</p>
	else return <Order order={order} />

}

OrderCard.propTypes = {
	id: string.isRequired
}

export default OrderCard
