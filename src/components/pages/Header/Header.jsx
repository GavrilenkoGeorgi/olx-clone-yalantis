import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import routes from '../../routes/routesConstants'

import { ReactComponent as MenuIcon } from '../../../assets/svg/ellipsis-v-solid.svg'
import { CartWidget } from '../../widgets'
import { CreateFormContainer } from '../../Forms'
import { PortalButton } from '../../UI'
import classes from './Header.module.sass'

import SideDrawer from '../../UI/SideDrawer/SideDrawer'
import { NavLinks } from '../../Navigation'

const Header = () => {

	const [ isSDOpen, setIsSDOpen ] = useState(false)
	const matchCartPage = useRouteMatch(routes.cart)

	const openSideDrawer = () => {
		setIsSDOpen(!isSDOpen)
	}

	const header = () => {
		return <header className={classes.header}>
			<SideDrawer
				open={isSDOpen}
				closed={() => setIsSDOpen(!isSDOpen)}
			/>
			<div className={classes.linksContainer}>
				<NavLinks />
			</div>
			<div className={classes.buttons}>
				<MenuIcon
					className={classes.menuIcon}
					onClick={() => openSideDrawer()}
				/>
				<CartWidget />
				<PortalButton
					title="Create new product"
					btnLabel="CREATE"
				>
					<CreateFormContainer />
				</PortalButton>
			</div>
		</header>
	}

	return matchCartPage ? null : header()
}

export default Header
