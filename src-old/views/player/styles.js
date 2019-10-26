import styled from 'styled-components'

export const PlayerCssFix = styled.div`
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