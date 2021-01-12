import React from 'react'
import { func } from 'prop-types'
import { notification } from '../../propTypes'

import classes from './Notification.module.sass'

const Notification = ({ notification, close }) => {

	const { message, variant } = notification

	return <div className={classes.container}>
		<div className={`${classes.notification}
			${ variant === 'error' ? classes.error : '' }`}>
			<p className={classes.text}>{message}</p>
			<hr />
			<div className={classes.controls}>
				<button onClick={() => close()}>Close</button>
			</div>
		</div>
	</div>
}

Notification.propTypes = {
	notification,
	close: func.isRequired
}

Notification.defaultProps = {
	notification: {
		message: 'No message set.'
	}
}

export default Notification
