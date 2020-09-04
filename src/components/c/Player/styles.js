import styled from 'styled-components'

export const Style = styled.div`
	padding-top: 8.4rem;
	padding-bottom: 15rem;
	overflow-y: scroll;
	height: calc(100vh - 23.4rem);

	& > div {
		& .ayamelPlayer,
		& .videoBox,
		& .mediaPlayer {
			width: 100% !important;
			height: 70vh;
		}
		& .sliderContainer {
			padding-bottom: 0 !important;
		}
	}

	& .player-wrapper {
		position: relative;
		background-color: black;
	}
`

export const Blank = styled.div`
	position: absolute;
	background-color: ${props => props.blank ? ('black') : ('transparent')};
	z-index: 10;
	width: 100%;
	height: 100%;
	top: 0px;
`

export const Comment = styled.div`
	--x: ${props => props.commentX !== 0 ? `${props.commentX}%` : `0%`};
	--y: ${props => props.commentY !== 0 ? `${props.commentY}%` : `0%`};

	position: absolute;
	top: var(--y);
	left: calc(var(--x));
	font-size: 2rem;
	color: white; style={{ w}}
	z-index: 15;
`
export const Transcript = styled.div`
	width: 50rem;
	border: 1px solid black;
	margin-left: 10px;

	& .transcript-row {
		cursor: pointer;

		& td {
			border-bottom: 1.5px solid var(--light-blue);
			padding: 2px;
		}
	}
`



export default Style
