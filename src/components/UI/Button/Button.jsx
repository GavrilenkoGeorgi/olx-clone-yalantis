import React from 'react'
import { string, func } from 'prop-types'

const Button = ({ label, clicked, ...props }) => {

	return <button
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
