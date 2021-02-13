import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureAppStore } from './store/store'

import { App } from './components/containers'
import { GlobalStyle } from './globalStyle'

const { store } = configureAppStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<GlobalStyle />
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('react-root')
)
