import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { func } from 'prop-types'
import routes from '../../routes/routesConstants'

import classes from './NavLinks.module.sass'

const NavLinks = ({ clicked }) => {

	const linksContainer = useRef()

	useEffect(() => {
		const drawerRef = linksContainer.current
		const closeDrawer = event => {
			if (clicked && event.target.tagName.toLowerCase() === 'a') {
				clicked()
			}
		}
		drawerRef.addEventListener('click', closeDrawer)
		return () => drawerRef.removeEventListener('click', closeDrawer)
	}, [ clicked ])

	return <nav
		ref={linksContainer}
		className={classes.navLinks}
	>
		<NavLink
			exact
			to={routes.mainPage}
			activeClassName={classes.active}
		>
			MAIN
		</NavLink>
		<NavLink
			exact
			to={routes.products}
			activeClassName={classes.active}
		>
			PRODUCTS
		</NavLink>
		<NavLink
			to={routes.productsCreated}
			activeClassName={classes.active}
		>
			MY PRODUCTS
		</NavLink>
		<NavLink
			exact
			to={routes.orders}
			activeClassName={classes.active}
		>
			ORDERS
		</NavLink>
	</nav>
}

NavLinks.propTypes = {
	clicked: func
}

export default NavLinks
