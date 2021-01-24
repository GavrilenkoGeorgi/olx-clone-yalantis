import React, { useState } from 'react'
import { string, object } from 'prop-types'

import { Button, PortalContainer, PortalLayout } from '../../UI'

const PortalButton = ({ title, btnLabel, children }) => {

	const [ isOn, setOn ] = useState(false)

	return <>
		<Button
			label={btnLabel}
			clicked={() => {
				setOn(!isOn)
			}}
		>
			CREATE
		</Button>
		<PortalContainer isOn={isOn}>
			<PortalLayout
				title={title}
				close={() => setOn(!isOn)}
			>
				{children}
			</PortalLayout>
		</PortalContainer>
	</>
}

PortalButton.propTypes = {
	title: string.isRequired,
	btnLabel: string.isRequired,
	children: object
}

export default PortalButton
