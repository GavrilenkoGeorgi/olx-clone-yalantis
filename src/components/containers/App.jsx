import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppContainer from './AppContainer/AppContainer'
import Header from '../pages/Header/Header'
import Routes from '../routes/Routes'
import Footer from '../pages/Footer/Footer'

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
