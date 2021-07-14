import styled from 'styled-components'

const Style = styled.div`

	// position: relative;

	display: flex;
	align-items: center;
	background-color: var(--navy-blue);
	color: white;
	width: 100%;
	height: 100%;

	border-left: 1px solid white;
	border-top: 1px solid white;
	border-bottom: 1px solid white;

	// &.ghost {
	// 	z-index: 1000;
	// 	opacity: .75;
	// 	pointer-events: none;
	// }
`

export default Style

export const I = styled.i`
	display: block;
	height: 2rem;
	width: 2rem;
	margin: auto 1.5rem;
	background: url(${props => props.src}) center no-repeat;
	background-size: contain;
`
