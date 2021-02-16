import React from 'react'

import OrdersList from '../../Orders/OrdersList'
import { Section, Header } from './OrdersStyle'

const Orders = () => {
	return <Section>
		<Header>Orders</Header>
		<OrdersList />
	</Section>
}

export default Orders
