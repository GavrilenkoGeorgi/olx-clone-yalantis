import React from 'react'
import { NavLink } from 'react-router-dom'

import { useCart } from '../../context/CartContext'
import routes from '../routes/routesConstants'
import { calcTotal } from '../../utils'
import classes from './CartWidget.module.sass'

const CartWidget = () => {

	const { items } = useCart()

	return <div className={classes.widget}>
		<NavLink
			to={routes.cart}
		>
			Cart total: {calcTotal(items)}
		</NavLink>
	</div>
}

export default CartWidget
