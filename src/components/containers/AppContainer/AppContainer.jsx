import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { children } from '../../propTypes'

import { productsListApi } from '../../../api/productsApi'
import ErrorFallback from '../ErrorBoundary/ErrorFallback'

import { Loader, Notification } from '../../widgets'

const AppContainer = ({ children }) => {

	const requestIsSuccessful = config => {
		setIsLoading(true)
		return config
	}

	const reponseIsSuccessful = response => {
		setIsLoading(false)
		return response
	}

	const handleError = error => {
		console.error(error.message)
		setIsLoading(false)
		setNotification({ message: error.message, variant: 'error' })
		return Promise.reject(error)
	}

	productsListApi.interceptors.request.use(requestIsSuccessful, handleError)
	productsListApi.interceptors.response.use(reponseIsSuccessful, handleError)

	const [ isLoading, setIsLoading ] = useState(false)
	const showLoader = () => isLoading ? <Loader /> : null

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
