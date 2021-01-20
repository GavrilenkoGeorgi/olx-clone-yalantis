import React from 'react'
import { string, arrayOf, func } from 'prop-types'

export const Select = (props) => {

	return <select
		name={props.name}
		onChange={props.onChange}
		value={props.defaultValue}
	>
		{props.options.map(option => (
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
	defaultValue: string.isRequired
}

export default Select
