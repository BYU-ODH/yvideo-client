import styled from 'styled-components'

import plus from 'assets/plus.svg'

const Style = styled.div`
	display: grid;
	grid: repeat(3, 1fr) / 1fr;
	grid-gap: 2rem;

	min-width: 30rem;
`

export const StyledDiv = styled.div`
	padding: 0;

	border: none;
	background: transparent;

	font-weight: normal;
	line-height: 3.7rem;

	height: 3.5rem;

	display: flex;
	align-items: center;

	outline: none;

	cursor: pointer;
`

export const Plus = styled.div`
	height: 1.7rem;
	width: 1.7rem;

	margin-right: 1rem;

	background: url(${plus}) center no-repeat;
	background-size: contain;
`

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export default Style