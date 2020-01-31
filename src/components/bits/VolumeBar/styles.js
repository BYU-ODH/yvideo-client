import styled from 'styled-components'

const transSpeed = `.1s`

const Style = styled.div`
	transition: all ${transSpeed} linear;
	height: .4rem;
	width: 50px;

	position: relative;
`

export default Style

export const BarBall = styled.div`

	position: absolute;
	top: -.25rem;

	left: calc(${props => props.volume * 100}% - .5rem);

	transition: all ${transSpeed} linear;
	height: 1rem;
	width: 1rem;
	border-radius: 50%;

	background-color: #0057b8;
`

export const BarCurrent = styled.div`
	position: absolute;
	left: 0;
	width: ${props => props.volume * 100}%;
	transition: all ${transSpeed} linear;
	height: .4rem;
	background-color: #0057b8;
`

export const BarBackground = styled.div`
	position: absolute;
	width: 100%;
	transition: all ${transSpeed} linear;
	height: .4rem;
	background-color: #fff;
`
