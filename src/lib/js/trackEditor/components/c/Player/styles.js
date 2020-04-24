import styled from 'styled-components'

export const Style = styled.div`
	overflow-y: scroll;
	/* height: calc(100vh - 8.4rem - 220px); */
	height: 100%;
	width: 100%;

	& > div {
		& .ayamelPlayer,
		& .videoBox,
		& .mediaPlayer {
			width: 100% !important;
			/* height: 50vh; */
		}
		& .sliderContainer {
			padding-bottom: 0 !important;
		}
	}

	& .player-wrapper {
		position: relative;
		background-color: black;
		height: 100%;
	width: 100%;
	}
`

export default Style
