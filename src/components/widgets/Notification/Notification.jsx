import React from 'react'
import PropTypes from 'prop-types'

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
	notification: PropTypes.object.isRequired,
	close: PropTypes.func.isRequired
}

export default Notification
