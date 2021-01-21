import React from 'react'
import { string, func } from 'prop-types'

const Slider = ({ labelText, ...props }) => {

	return <>
		<input type="range"
			{...props}
		/>
		<label htmlFor={props.id}>
			{labelText}
		</label>
	</>
}

Slider.propTypes = {
	id: string.isRequired,
	name: string.isRequired,
	min: string.isRequired,
	max: string.isRequired,
	labelText: string.isRequired,
	onChange: func.isRequired
}

export default Slider
