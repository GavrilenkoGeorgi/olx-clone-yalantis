import React from 'react'
import { string, func } from 'prop-types'

const CheckBox = ({ clicked, labelText, ...props }) => {

	return <>
		<input
			type="checkbox"
			onChange={clicked}
			{...props}
		/>
		<label htmlFor={props.id}>
			{labelText}
		</label>
	</>
}

CheckBox.propTypes = {
	labelText: string.isRequired,
	id: string.isRequired,
	name: string.isRequired,
	clicked: func.isRequired
}

export default CheckBox
