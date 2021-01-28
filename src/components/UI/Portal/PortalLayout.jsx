import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { children } from '../../propTypes'

import { Button } from '../../UI'
import classes from './PortalLayout.module.sass'

const PortalLayout = ({ title, children, close }) => {

	const backdrop = useRef(null)

	useEffect(() => {
		const backdropRef = backdrop.current

		const closePortal = ({ target }) => {
			if (target === backdrop.current) close()
		}

		backdropRef.addEventListener('click', closePortal)
		return () => backdropRef.removeEventListener('click', closePortal)

	}, [ close ])

	return <div ref={backdrop} className={classes.backdrop}>
		<div className={classes.portal}>
			<div className={classes.header}>
				<h1>{title}</h1>
				<Button
					className={classes.closeBtn}
					label="X"
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