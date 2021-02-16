import styled from 'styled-components'
import { MEDIASIZES } from '../../styles/variables'

export const Article = styled.article`
	display: grid;
	grid-gap: .5rem;
	grid-template-columns: repeat(2, 1fr);
	@media (max-width: ${MEDIASIZES.small}) {
		grid-template-columns: repeat(1, 1fr)
	}
	@media (min-width: ${MEDIASIZES.extraLarge}) {
		grid-template-columns: repeat(4, 1fr)
	}
`