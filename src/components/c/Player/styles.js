import styled from 'styled-components'

import blockView from 'assets/block-view.svg'
import listView from 'assets/list-view.svg'

export const Style = styled.div`
	& .ayamelPlayer,
	& .videoBox,
	& .mediaPlayer {
		width: 100% !important;
		height: 70vh;
	}
	& .sliderContainer {
		padding-bottom: 0 !important;
	}
`

export default Style

export const ViewToggle = styled.button`
	background: url(${props => props.displayBlocks ? listView : blockView}) center no-repeat;
	background-size: cover;
	border: none;
	height: 1.5rem;
	width: 1.5rem;
	margin-left: 5rem;
	outline: none;
	cursor: pointer;
`
