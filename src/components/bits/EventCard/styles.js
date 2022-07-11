import styled from 'styled-components'

const Style = styled.div`

	position: relative;
	top: 0;
	left: 0;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	background-color: var(--navy-blue);
	color: white;
	cursor: grab;

	height: 100%;
	width: 100%;

	/* border-left: 1px solid;
	border-top: 1px solid;
	border-bottom: 1px solid; */
	/* margin-bottom: 1rem; */
	/* box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.75); */

	opacity: ${props => props.opacity};

	&.ghost {
		z-index: 1000;
		opacity: .75;
		pointer-events: none;
	}
`

export default Style

export const Img = styled.img`
	display: block;
	height: 2rem;
	width: 2rem;
	margin: auto 1.5rem;
	background: url(${props => props.src}) center no-repeat;
	background-size: contain;
`
