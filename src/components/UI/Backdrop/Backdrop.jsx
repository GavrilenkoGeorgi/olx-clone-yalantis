import React from 'react'
import { bool, func } from 'prop-types'

import classes from './Backdrop.module.sass'

const Backdrop = props => (
	props.show
		? <div
			className={classes.backdrop}
			onClick={props.clicked}
		>
		</div>
		: null
)

Backdrop.propTypes = {
	show: bool.isRequired,
	clicked: func.isRequired
}

export default Backdrop
