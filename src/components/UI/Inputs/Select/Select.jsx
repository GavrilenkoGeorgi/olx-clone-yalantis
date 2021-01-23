import React from 'react'
import { bool, string, arrayOf, func } from 'prop-types'

import cx from 'classnames'
import classes from './Select.module.sass'

export const Select = ({ error, defaultOption, options, isValid, isInvalid, ...props }) => {

	const selectClasses = cx(classes.input, {
		[classes.invalid]: isInvalid,
		[classes.valid]: isValid
	})

	return <>
		<select className={selectClasses}
			{ ...props }
		>
			{defaultOption &&
				<option
					key={defaultOption}
					value={defaultOption}
				>
					{defaultOption}
				</option>
			}
			{options.map(option => (
				<option
					key={option}
					value={option}
				>
					{option}
				</option>
			))}
		</select>
		{error && <p>{error}</p>}
	</>
}

Select.propTypes = {
	name: string.isRequired,
	options: arrayOf(string).isRequired,
	onChange: func.isRequired,
	value: string.isRequired,
	isValid: bool,
	isInvalid: bool,
	defaultOption: string,
	error: string
}

export default Select
