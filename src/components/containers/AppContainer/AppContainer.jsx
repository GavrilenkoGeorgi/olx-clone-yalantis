import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { productsListApi } from '../../../api/productsApi'
import { CartContext } from '../../../context/CartContext'
import { loadData as loadSavedCartItems } from '../../../utils'

import Loader from '../../widgets/Loader/Loader'
import Notification from '../../widgets/Notification/Notification'

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
		setNotification({ ...notification, message: error.message, variant: 'error' })
		return Promise.reject(error)
	}

	productsListApi.interceptors.request.use(requestIsSuccessful, handleError)
	productsListApi.interceptors.response.use(reponseIsSuccessful, handleError)

	const savedCartItems = loadSavedCartItems()
	const [ items, setItems ] = useState(savedCartItems || [])

	const [ isLoading, setIsLoading ] = useState(false)
	const showLoader = () => isLoading ? <Loader /> : null

	const emptyNotification = { message: '', variant: '' }
	const [ notification, setNotification ] = useState(emptyNotification)

	const closeNotification = () => setNotification(emptyNotification)
	const showNotification = () =>
		notification.message
			? <Notification notification={notification} close={closeNotification} />
			: null

	return <CartContext.Provider value={{ items, setItems }}>
		{children}
		{showLoader()}
		{showNotification()}
	</CartContext.Provider>
}

AppContainer.propTypes = {
	children: PropTypes.array.isRequired
}

export default AppContainer
