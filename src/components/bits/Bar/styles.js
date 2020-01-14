import styled from 'styled-components'

const barInactive = `.4rem`
const barActive = `.6rem`
const transSpeed = `.2s`

const Style = styled.div`
	transition: all ${transSpeed} ease-in-out;
	height: ${props => props.active ? barActive : barInactive};

	position: relative;
`

export default Style

export const BarBall = styled.div`

	position: absolute;
	top: ${props => props.active ? `-.2rem` : `.3rem`};

	left: calc(${props => props.position * 100}% - .5rem);

	transition: all ${transSpeed} ease-in-out;
	height: ${props => props.active ? `1rem` : `0`};
	width: ${props => props.active ? `1rem` : `0`};
	border-radius: 50%;

	background-color: #0057b8;
`

export const BarCurrent = styled.div`

	position: absolute;
	left: 0;

	width: ${props => props.position * 100}%;

	transition: all ${transSpeed} ease-in-out;
	height: ${props => props.active ? barActive : barInactive};

	background-color: #0057b8;
`

export const BarBackground = styled.div`

	position: absolute;

	transition: all ${transSpeed} ease-in-out;
	width: 100%;

	height: ${props => props.active ? barActive : barInactive};

	background-color: #fff;
`
