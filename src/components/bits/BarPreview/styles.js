import styled from 'styled-components'

const barActive = `.6rem`
const transSpeed = `.1s`

const Style = styled.div`
	transition: all ${transSpeed} linear;
	height: ${barActive};

	position: relative;
	cursor: pointer;
	z-index = 1000;
`

export default Style

export const BarBackground = styled.div`
	position: absolute;
	width: 100.1%;
	transition: all ${transSpeed} linear;
	height: ${barActive};
	top: -0.6px;
	background-color: lightgrey;
`

export const BarCurrent = styled.div`
	position: absolute;
	left: 0;
	transition: all ${transSpeed} linear;
	height: ${barActive};
	background-color: #0057b8;
	top: -0.5px;

`
export const BarBall = styled.div`
	position: absolute;
	top: -0.224rem;

	transition: all ${transSpeed} linear;
	height: 1rem;
	width: 1rem;
	border-radius: 50%;

	background-color: #0057b8;
`
