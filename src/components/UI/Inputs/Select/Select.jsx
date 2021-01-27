import React from 'react'
import { string, arrayOf, func } from 'prop-types'

export const Select = ({ options, ...props }) => {

	return <select
		{ ...props }
	>
		{options.map(option => (
			<option
				key={option}
				value={option}
			>
				{option}
			</option>
		))}
	</select>
}

Select.propTypes = {
	name: string.isRequired,
	options: arrayOf(string).isRequired,
	onChange: func.isRequired,
	value: string.isRequired
}

export default Select
