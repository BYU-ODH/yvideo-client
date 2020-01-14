import styled from 'styled-components'

// import pauseButton from 'assets/controls_pause.svg'
// import playButton from 'assets/controls_play.svg'

const Style = styled.div`
	position: absolute;
	bottom: 0;

	height: 5rem;
	width: 100%;

	background: rgba(0,0,0,0.5);

	display: grid;

	grid-template-rows: .5rem auto;
	grid-template-areas:
		"scrubber scrubber"
		"left right";

	& .right {
		grid-area: right;
		display: flex;
		flex-direction: row-reverse;
	}

	& .left {
		grid-area: left;
		display: flex;
	}
`

export default Style

export const PlayPause = styled.button`
	/* background: url() center no-repeat; */
	background-size: contain;
`
