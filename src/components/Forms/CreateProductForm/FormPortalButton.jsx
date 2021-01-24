import React, { useState } from 'react'

import { Button, PortalContainer, PortalLayout } from '../../UI'
import CreateProductForm from './CreateProductForm'

const FormPortalButton = () => {

	const [ isOn, setOn ] = useState(false)

	return <>
		<Button
			label="CREATE"
			clicked={() => {
				setOn(!isOn)
			}}
		>
			CREATE
		</Button>
		<PortalContainer isOn={isOn}>
			<PortalLayout
				title="Create new product"
				close={() => setOn(!isOn)}
			>
				<CreateProductForm />
			</PortalLayout>
		</PortalContainer>
	</>
}

export default FormPortalButton
