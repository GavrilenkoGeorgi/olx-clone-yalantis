import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { productsListApi } from '../../../api/productsApi'
import { CartContext } from '../../../context/CartContext'
import { loadData as loadSavedCartItems } from '../../../utils'

export const AppContainer = ({ children }) => {

	const requestIsSuccessful = config => {
		// set loading data status
		console.log('Loading...')
		return config
	}

	const reponseIsSuccessful = response => {
		// set response OK status
		console.log('Response status:', response.status)
		return response
	}

	const handleError = error => {
		console.error('Custom error handler:', error)
		return Promise.reject(error)
	}

	productsListApi.interceptors.request.use(requestIsSuccessful, handleError)
	productsListApi.interceptors.response.use(reponseIsSuccessful, handleError)

	const savedCartItems = loadSavedCartItems()
	const [ items, setItems ] = useState(savedCartItems || [])

	return <CartContext.Provider value={{ items, setItems }}>
		{children}
	</CartContext.Provider>
}

AppContainer.propTypes = {
	children: PropTypes.array.isRequired
}

export default AppContainer
