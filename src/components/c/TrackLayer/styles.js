import styled from 'styled-components'

import timeBarIcon from 'assets/time-bar-icon.svg'

export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
  background-size: 18px 18px;
  height: 4rem;
  width: 4rem;
`

export const Style = styled.div`

	/* width: auto; */
	width: 100%;
	height: auto;
	z-index: 0;
	overflow-x: scroll;

	& .eventsbox {
    position: relative;
    width: 100%;
    height: 100%;
	}

	& .events {
		width: ${props => props.layerWidth !== 0 ? `${props.layerWidth}px` : `calc(100%)`};
		border-bottom: 1px dashed var(--light-blue);
		display: flex;
		height: 45px;
		position: absolute;
		border-right: 2px solid var(--light-blue);
		/* background: url(${timeBarIcon}) center repeat;
		background-size: 200px 100%; */
	}

	& .layer-event {
		border: 1px solid var(--light-blue) !important;
		border-radius: 3px;
		height: 46px !important;
		padding: 1px;
		min-width: .01%;
		overflow: hidden !important;
		display: flex !important;
		background-color: white;
		box-shadow: 2px 2px 3px rgba(0,0,0, 0.2), -2px -2px 3px rgba(0,0,0, 0.2);
		overflow-x: scroll !important;

		&	p {
			font-size: 1.3rem;
			text-align: left;
			margin: auto 0px auto 2px;
			padding: 1px 2px 1px 2px;
			background-color: transparent;

		}
		&	div{
			text-align: right;
			margin: 0px;
			padding: 0px 3px 0px 3px;
		}
	}

	& .active-event {
		background-color: var(--navy-blue);
		& p { color: white !important; };
	}

	& .active-layer {
		background-color: rgba(0, 46, 93, 0.1);
		& p {
			color: black;
			font-size: 1.3rem;
		}
	}
`