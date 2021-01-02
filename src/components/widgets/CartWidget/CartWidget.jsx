import React from 'react'
import { NavLink } from 'react-router-dom'

import { useCart } from '../../../context/CartContext'
import routes from '../../routes/routesConstants'
import { calcTotal } from '../../../utils'
import { ReactComponent as CartIcon } from '../../../assets/svg/shopping-cart-solid.svg'
import classes from './CartWidget.module.sass'

const CartWidget = () => {

	const { items } = useCart()

	const total = calcTotal(items)

	return <div className={classes.widget}>
		<NavLink to={routes.cart} >
			<span className={classes.total}>
				{total}
			</span>
			<CartIcon className={classes.icon} />
		</NavLink>
	</div>
}

export default CartWidget
