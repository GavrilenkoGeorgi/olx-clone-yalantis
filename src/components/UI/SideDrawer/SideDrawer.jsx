import React from 'react'
import { bool, func } from 'prop-types'

import classes from './SideDrawer.module.sass'
import Backdrop from '../Backdrop/Backdrop'

import { NavLinks } from '../../Navigation'

const SideDrawer = ({ open, closed }) => {

	let attachedClasses = [ classes.sideDrawer, classes.close ]
	if (open) attachedClasses = [ classes.sideDrawer, classes.open ]

	return <>
		<Backdrop show={open} clicked={closed}/>
		<div className={attachedClasses.join(' ')}>
			<NavLinks clicked={() => closed()}/>
		</div>
	</>
}

SideDrawer.propTypes = {
	open: bool.isRequired,
	closed: func.isRequired
}

export default SideDrawer
