import styled from 'styled-components'

const barActive = `.6rem`
const transSpeed = `.1s`

const Style = styled.div`
	transition: all ${transSpeed} linear;
	height: ${barActive};

	position: relative;
`

export default Style

export const BarBackground = styled.div`
	position: absolute;
	width: 100%;
	transition: all ${transSpeed} linear;
	height: ${barActive};
	background-color: ${props => props.isClip ? `gray` : `#fff`};
`

export const BarCurrent = styled.div`
	position: absolute;
	left: 0;
	transition: all ${transSpeed} linear;
	height: ${barActive};
	background-color: ${props => props.clipPercent < props.clipPercent[0] ? `gray` : `#0057b8`}
	// background-color: #0057b8;

`

export const BarClipYellow = styled.div`
	position: absolute;
	width: ${props => (props.clipPercent[1] - props.clipPercent[0]) * 100}%;
	left: ${props => props.clipPercent[0] * 100}%;
	background-color: white;
	transition: all ${transSpeed} linear;
	height: ${barActive};
`

export const BarBall = styled.div`
	position: absolute;
	top: ${props => props.active ? `-.2rem` : `.3rem`};

	transition: all ${transSpeed} linear;
	height: ${props => props.active ? `1rem` : `0`};
	width: ${props => props.active ? `1rem` : `0`};
	border-radius: 50%;

	background-color: #0057b8;
`

export const BarSkippedGray = styled.div`
	position: absolute;
	width: ${props => (props.end - props.start) / props.duration * 100}%;
	left: ${props => props.start / props.duration * 100}%;
	background-color: gray;
	height: ${barActive};
`

export const BarBeforeClip = styled.div`
	position: absolute;
	width:${props => props.clipPercent[0] * 100}%;
	left: 0;
	background-color: gray;
	height: ${barActive};
`