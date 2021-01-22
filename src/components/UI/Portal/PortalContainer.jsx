import React from 'react'
import { bool } from 'prop-types'
import { children } from '../../propTypes'
import { Portal } from '../../UI'

const PortalContainer = ({ isOn, children }) => {

	return isOn ? <Portal>
		{children}
	</Portal> : null
}

PortalContainer.propTypes = {
	isOn: bool.isRequired,
	children
}

PortalContainer.defaultProps = {
	children: []
}

export default PortalContainer
