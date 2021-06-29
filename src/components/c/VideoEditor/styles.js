import styled, { keyframes } from 'styled-components'

// import carat from 'assets/carat_white.svg'

// import menu from 'assets/menu-white.svg'

import skipIcon from 'assets/event_skip.svg'
import muteIcon from 'assets/event_mute.svg'
import pauseIcon from 'assets/event_pause.svg'
import commentIcon from 'assets/event_comment.svg'
import censorIcon from 'assets/event_censor.svg'
import blankIcon from 'assets/event_blank.svg'
import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'
import zoomIn from 'assets/te-zoom-in.svg'
import zoomOut from 'assets/te-zoom-out.svg'

const Style = styled.div`

	background-color: white;
	overflow: hidden;

	padding-top: var(--navbar-height);
	height: calc(100vh - var(--navbar-height));
	z-index: 0;

	display: flex;
`
export default Style

export const SkipIcon = styled.span`
	background: url(${skipIcon}) center no-repeat;
`

export const MuteIcon = styled.span`
	background: url(${muteIcon}) center no-repeat;
`

export const PauseIcon = styled.span`
	background: url(${pauseIcon}) center no-repeat;
`

export const CommentIcon = styled.span`
	background: url(${commentIcon}) center no-repeat;
`

export const CensorIcon = styled.span`
	background: url(${censorIcon}) center no-repeat;
`

export const BlankIcon = styled.span`
	background: url(${blankIcon}) center no-repeat;
`

export const TrashIcon = styled.span`
	background: url(${trashIcon}) center no-repeat;
`

export const CloseIcon = styled.span`
	background: url(${closeIcon}) center no-repeat;
`

export const ZoomInIcon = styled.span`
	background: url(${zoomIn}) center no-repeat;
`

export const ZoomOutIcon = styled.span`
	background: url(${zoomOut}) center no-repeat;
`