import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppContainer } from './'
import { Routes } from '../routes'
import { Header, Footer } from '../pages'

const App = () => {
	return <Router>
		<AppContainer>
			<Header />
			<Routes />
			<Footer />
		</AppContainer>
	</Router>
}

export default App
