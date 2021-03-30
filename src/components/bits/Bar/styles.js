import styled from 'styled-components'

const barInactive = `.4rem`
const barActive = `.6rem`
const transSpeed = `.1s`

const Style = styled.div`
	transition: all ${transSpeed} linear;
	height: ${barActive}

	position: relative;
`

export default Style

export const BarBall = styled.div.attrs(props => ({
	style: {
		left: `calc(${props.position * 100}% - .5rem)`
	}
}))`
	position: absolute;
	top: ${props => props.active ? `-.2rem` : `.3rem`};

	transition: all ${transSpeed} linear;
	height: ${props => props.active ? `1rem` : `0`};
	width: ${props => props.active ? `1rem` : `0`};
	border-radius: 50%;

	background-color: #0057b8;
`

export const BarCurrent = styled.div.attrs(props => ({
	style: {
		width: `${props.position * 100}%`
	}
}))`
	position: absolute;
	left: 0;
	transition: all ${transSpeed} linear;
	height: ${barActive};
	background-color: #0057b8;
`

export const BarBackground = styled.div`
	position: absolute;
	width: 100%;
	transition: all ${transSpeed} linear;
	height: ${barActive};
	background-color: #fff;
`
