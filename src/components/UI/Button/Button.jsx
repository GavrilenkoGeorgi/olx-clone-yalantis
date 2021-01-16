import React from 'react'
import { string, func } from 'prop-types'

const Button = ({ label, clicked }) => {

	return <button
		onClick={clicked}
	>
		{label}
	</button>
}

Button.propTypes = {
	label: string.isRequired,
	clicked: func.isRequired
}

export default Button
