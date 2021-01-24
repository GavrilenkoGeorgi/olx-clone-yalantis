import React from 'react'
import { useRouteMatch, NavLink } from 'react-router-dom'
import routes from '../../routes/routesConstants'

import { CartWidget } from '../../widgets'
import { CreateProductForm } from '../../Forms'
import { PortalButton } from '../../UI'
import classes from './Header.module.sass'

const Header = () => {

	const matchCartPage = useRouteMatch(routes.cart)

	const header = () => {
		return <header className={classes.header}>
			<nav>
				<NavLink
					exact
					to={routes.mainPage}
					activeClassName={classes.active}
				>
					MAIN
				</NavLink>
				<NavLink
					to={routes.products}
					activeClassName={classes.active}
				>
					PRODUCTS
				</NavLink>
			</nav>
			<PortalButton
				title="Create new product"
				btnLabel="CREATE"
			>
				<CreateProductForm />
			</PortalButton>
			<CartWidget />
		</header>
	}

	return matchCartPage ? null : header()
}

export default Header
