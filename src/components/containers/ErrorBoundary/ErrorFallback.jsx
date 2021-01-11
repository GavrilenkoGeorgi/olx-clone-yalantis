import React from 'react'
import PropTypes from 'prop-types'

import classes from './ErrorFallback.module.sass'

const ErrorFallback = ({ error }) => (
	<div role="alert" className={classes.ErrorFallback}>
		<p>Something went wrong:</p>
		<pre>{error.message}</pre>
		<pre className={classes.stack}>{error.stack}</pre>
	</div>
)

ErrorFallback.propTypes = {
	error: PropTypes.object
}

ErrorFallback.defaultProps = {
	error: {}
}

export default ErrorFallback
