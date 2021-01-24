import React from 'react'
import PropTypes from 'prop-types'
import { children } from '../../propTypes'

import { Button } from '../../UI'
import classes from './PortalLayout.module.sass'

const PortalLayout = ({ title, children, close }) => {

	return <div className={classes.backdrop}>
		<div className={classes.portal}>
			<div className={classes.header}>
				<h1>{title}</h1>
				<Button
					className={classes.closeBtn}
					label="X"
					autoFocus
					clicked={close}
				/>
			</div>
			<div className={classes.content}>
				{children}
			</div>
			<div className={classes.footer}>
				<Button
					className={classes.closeBtn}
					label="CLOSE"
					clicked={close}
				/>
			</div>
		</div>
	</div>
}

PortalLayout.propTypes = {
	title: PropTypes.string.isRequired,
	children,
	close: PropTypes.func.isRequired
}

PortalLayout.defaultProps = {
	children: []
}

export default PortalLayout
