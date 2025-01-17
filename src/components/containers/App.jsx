import React from 'react'
import { Router } from 'react-router-dom'

import { AppContainer } from './'
import { Routes } from '../routes'
import { Header, Footer } from '../pages'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const App = () => {
	return <Router history={history}>
		<AppContainer>
			<Header />
			<Routes />
			<Footer />
		</AppContainer>
	</Router>
}

export default App
