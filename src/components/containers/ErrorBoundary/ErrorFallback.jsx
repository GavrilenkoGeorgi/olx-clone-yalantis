import React from 'react'
import { object } from 'prop-types'

import classes from './ErrorFallback.module.sass'

const ErrorFallback = ({ error }) => (
	<div role="alert" className={classes.ErrorFallback}>
		<p>Something went wrong:</p>
		<pre>{error.message}</pre>
		<pre className={classes.stack}>{error.stack}</pre>
	</div>
)

ErrorFallback.propTypes = {
	error: object
}

ErrorFallback.defaultProps = {
	error: {}
}

export default ErrorFallback
