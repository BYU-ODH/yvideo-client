import styled from 'styled-components'

import pauseIcon from 'assets/preview-pause.svg'
import playIcon from 'assets/preview-play.svg'

export const PlayPause = styled.div `
	background: url(${props => props.playing ? pauseIcon : playIcon}) center no-repeat;
	width: 100%;
	height: 100%;
	position: relative;
	margin: 0 auto;
	cursor: pointer;
	z-index: 9;
`

const Wrapper = styled.div `
	position: absolute;
	background-color: transparent;
	z-index: 10;
	width: 100%;
	height: 100%;
	top: 0px;
`

export default Wrapper
