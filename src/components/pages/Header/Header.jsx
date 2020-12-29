import React from 'react'
import { useRouteMatch, NavLink } from 'react-router-dom'
import routes from '../../routes/routesConstants'

import CartWidget from '../../widgets/CartWidget'
import classes from './Header.module.sass'

export const Header = () => {

	const matchCartPage = useRouteMatch(routes.cart)

	const header = () => {
		return <header className={classes.header}>
			<nav>
				<NavLink
					exact
					to={routes.mainPage}
					activeClassName={classes.active}
				>
					Main
				</NavLink>
				<NavLink
					to={routes.products}
					activeClassName={classes.active}
				>
					Products
				</NavLink>
			</nav>
			<CartWidget />
		</header>
	}

	return matchCartPage ? null : header()
}

export default Header
