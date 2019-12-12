import styled from 'styled-components'

export const Container = styled.div`
	padding-top: 8.4rem;
	padding-bottom: 15rem;
	overflow-y: scroll;
	height: calc(100vh - 23.4rem);
`

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