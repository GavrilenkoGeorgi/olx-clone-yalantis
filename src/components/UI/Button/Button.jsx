import React from 'react'
import { string, func, object } from 'prop-types'

import classes from './Button.module.sass'

const Button = ({ innerRef, label, clicked, ...props }) => {

	return <button
		className={classes.btn}
		{...props}
		onClick={clicked}
		ref={innerRef}
	>
		{label}
	</button>
}

Button.propTypes = {
	label: string.isRequired,
	clicked: func,
	innerRef: object
}

export default Button
