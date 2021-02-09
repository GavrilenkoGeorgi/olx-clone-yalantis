import React from 'react'
import { string } from 'prop-types'

import classes from './ErrorMessage.module.sass'

const ErrorMessage = ({ error }) => {
	return <p className={classes.error}>{error}</p>
}

ErrorMessage.propTypes = {
	error: string
}

export default ErrorMessage
