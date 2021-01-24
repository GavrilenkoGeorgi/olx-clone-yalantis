import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	selectError,
	selectMessage,
	notificationsCleared
} from '../../../store/notifications/notificationsSlice'

import { Button } from '../../UI'
import cx from 'classnames'
import classes from './Notification.module.sass'

const Notification = () => {

	const dispatch = useDispatch()
	const error = useSelector(selectError)
	const message = useSelector(selectMessage)

	const closeNotification = () => {
		dispatch(notificationsCleared())
	}

	const containerClasses = cx(classes.container,
		{ [classes.open]: message || error },
		{ [classes.close]: !message && !error }
	)

	const notificationClasses = cx(classes.notification,
		{ [classes.message]: message },
		{ [classes.error]: error }
	)

	return <div className={containerClasses}>
		<div className={notificationClasses}>
			<p>{message} {error}</p>
			<Button className={classes.btn}
				label="Close" clicked={() => closeNotification()}
			/>
		</div>
	</div>
}

export default Notification
