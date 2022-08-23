import styled from 'styled-components'

const Style = styled.div`
	display: flex;
	align-items: center;
	background-color: var(--navy-blue);
	color: white;
	width: 100%;
	height: 100%;
`

export default Style

export const I = styled.i`
	display: block;
	height: 2rem;
	width: 2rem;
	margin: auto 1.2rem;
	background: url(${props => props.src}) center no-repeat;
	background-size: contain;
`
