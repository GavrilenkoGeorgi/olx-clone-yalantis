import React from 'react'
import { string, func } from 'prop-types'

import classes from './Button.module.sass'

const Button = ({ label, clicked, ...props }) => {

	return <button
		className={classes.btn}
		{...props}
		onClick={clicked}
	>
		{label}
	</button>
}

Button.propTypes = {
	label: string.isRequired,
	clicked: func
}

export default Button
