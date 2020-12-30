import React from 'react'
import { useHistory } from 'react-router-dom'

import classes from './BackButton.module.sass'

const BackButton = () => {
	const history = useHistory()

	const goBack = () => {
		history.goBack()
	}

	return <div className={classes.container}>
		<button onClick={goBack}>
			Go back
		</button>
	</div>
}

export default BackButton