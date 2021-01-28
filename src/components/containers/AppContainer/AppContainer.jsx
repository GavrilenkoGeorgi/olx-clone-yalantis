import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { children } from '../../propTypes'

import { productsListApi } from '../../../api/productsApi'
import {
	fetchingState,
	selectIsFetching,
	errorAdded
} from '../../../store/notifications/notificationsSlice'

import ErrorFallback from '../ErrorBoundary/ErrorFallback'
import { Loader, Notification } from '../../widgets'

const AppContainer = ({ children }) => {

	const dispatch = useDispatch()
	const fetching = useSelector(selectIsFetching)

	const requestIsSuccessful = config => {
		// dispatch(fetchingState(true))
		return config
	}

	const reponseIsSuccessful = response => {
		// dispatch(fetchingState(false))
		return response
	}

	const handleError = error => {
		dispatch(errorAdded(error.message))
		dispatch(fetchingState(false))
		return Promise.reject(error)
	}

	productsListApi.interceptors.request.use(requestIsSuccessful, handleError)
	productsListApi.interceptors.response.use(reponseIsSuccessful, handleError)

	const showLoader = () => fetching ? <Loader /> : null

	return <>
		{showLoader()}
		<Notification />
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
