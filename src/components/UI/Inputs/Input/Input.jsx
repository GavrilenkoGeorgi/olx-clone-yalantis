import React from 'react'
import { string, bool } from 'prop-types'


import cx from 'classnames'
import classes from './Input.module.sass'

const Input = ({ error, id, label, isValid, isInvalid, ...props }) => {

	const inputClasses = cx(classes.input, {
		[classes.invalid]: isInvalid,
		[classes.valid]: isValid
	})

	return <div className={classes.container}>
		<label htmlFor={id}>{label}</label>
		<input className={inputClasses}
			{ ...props }
		/>
		{error && <p>{error}</p>}
	</div>
}

Input.propTypes = {
	id: string.isRequired,
	label: string.isRequired,
	isValid: bool,
	isInvalid: bool,
	error: string
}

Input.defaultProps = {
	error: ''
}

export default Input
