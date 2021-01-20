import React from 'react'
import { string, func } from 'prop-types'

const CheckBox = (props) => {

	const { clicked, labelText, ...rest } = props

	return <>
		<input
			type="checkbox"
			onChange={clicked}
			{...rest}
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
