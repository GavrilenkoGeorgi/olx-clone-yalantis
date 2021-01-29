import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { App } from './components/containers'

import store from './store/store'
// import configureAppStore from './store/store'
// const store = configureAppStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('react-root')
)
