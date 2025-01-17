import React from 'react'
import { string } from 'prop-types'

const NumberInput = ({ labelText, ...props }) => {

	return <>
		<label htmlFor={props.id}>
			{labelText}
		</label>
		<input
			type="number"
			{...props}
		/>
	</>
}

NumberInput.propTypes = {
	labelText: string.isRequired,
	name: string.isRequired,
	id: string.isRequired,
	min: string.isRequired,
	max: string.isRequired
}

export default NumberInput
