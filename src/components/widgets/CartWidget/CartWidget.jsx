import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../../routes/routesConstants'

import { ReactComponent as CartIcon } from '../../../assets/svg/shopping-cart-solid.svg'
import classes from './CartWidget.module.sass'

const CartWidget = () => {

	const total = useSelector(state => state.cart.total)

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
