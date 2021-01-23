import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { children } from '../../propTypes'

import { productsListApi } from '../../../api/productsApi'
import {
	fetchingState,
	selectIsFetching,
	errorAdded,
	errorCleared
} from '../../../store/notifications/notificationsSlice'
import { DEFAULT_NOTIFICATION_TIMEOUT } from '../../../constants/settings'

import ErrorFallback from '../ErrorBoundary/ErrorFallback'
import { Loader, Notification } from '../../widgets'

const AppContainer = ({ children }) => {

	const dispatch = useDispatch()
	const fetching = useSelector(selectIsFetching)

	const requestIsSuccessful = config => {
		dispatch(fetchingState(true))
		return config
	}

	const reponseIsSuccessful = response => {
		dispatch(fetchingState(false))
		return response
	}

	const handleError = error => {
		dispatch(errorAdded(error.message))
		setTimeout(() => {
			dispatch(errorCleared())
		}, DEFAULT_NOTIFICATION_TIMEOUT)
		dispatch(fetchingState(false))
		return Promise.reject(error)
	}

	productsListApi.interceptors.request.use(requestIsSuccessful, handleError)
	productsListApi.interceptors.response.use(reponseIsSuccessful, handleError)

	const showLoader = () => fetching ? <Loader /> : null

	const emptyNotification = { message: '', variant: '' }
	const [ notification, setNotification ] = useState(emptyNotification)

	const closeNotification = () => setNotification(emptyNotification)
	const showNotification = () =>
		notification.message
			? <Notification notification={notification} close={closeNotification} />
			: null

	return <>
		{showLoader()}
		{showNotification()}
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			{children}
		</ErrorBoundary>
	</>
}

AppContainer.propTypes = {
	children
}

AppContainer.defaultProps = {
	children: []
}

export default AppContainer
