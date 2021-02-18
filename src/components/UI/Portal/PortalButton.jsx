import React, { useState, createRef, useEffect, useMemo, useCallback } from 'react'
import { string } from 'prop-types'
import { children } from '../../propTypes'

import { FOCUSABLE_ELEMENTS_LIST } from '../../../constants/constants'
import { Button, PortalContainer, PortalLayout } from '../../UI'

const PortalButton = ({ title, btnLabel, children }) => {

	const portalRef = createRef(null)
	const [ isOn, setOn ] = useState(false)

	const onModalClose = useCallback(() => setOn(!isOn), [ isOn ] )

	const handleTabKey = useCallback(e => {
		if (portalRef.current) {

			const focusableElements = portalRef.current.querySelectorAll(FOCUSABLE_ELEMENTS_LIST)
			const isPortalButton = () => document.activeElement.id === 'openPortal'

			const [ firstElement ] = focusableElements
			const lastElement = focusableElements[focusableElements.length - 1]

			if (isPortalButton()) {
				e.shiftKey
					? lastElement.focus()
					: firstElement.focus()
				return e.preventDefault()
			}
		}
	}, [ portalRef ])

	const keyListenersMap = useMemo(() =>
		new Map([ [ 27, onModalClose ], [ 9, handleTabKey ] ]
		), [ handleTabKey, onModalClose ])

	useEffect(() => {
		const keyListener = (e) => {
			const listener = keyListenersMap.get(e.keyCode)
			return listener && listener(e)
		}

		document.addEventListener('keydown', keyListener)
		return () => document.removeEventListener('keydown', keyListener)
	}, [ keyListenersMap ])

	const PortalWithRef = React.forwardRef((props, ref) => (
		<PortalLayout
			title={title}
			close={() => setOn(!isOn)}
			innerRef={ref}
		>
			{children}
		</PortalLayout>
	))

	PortalWithRef.displayName = 'PortalWithRef'

	return <>
		<Button
			id="openPortal"
			label={btnLabel}
			clicked={() => {
				setOn(!isOn)
			}}
		>
			CREATE
		</Button>
		<PortalContainer isOn={isOn}>
			<PortalWithRef ref={portalRef}>
				{children}
			</PortalWithRef>
		</PortalContainer>
	</>
}

PortalButton.propTypes = {
	title: string.isRequired,
	btnLabel: string.isRequired,
	children: children
}

export default PortalButton
