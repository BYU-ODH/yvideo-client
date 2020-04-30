import styled from 'styled-components'

import carat from 'assets/carat_white.svg'

const Style = styled.div`

padding-top: var(--navbar-height);
height: calc(100vh - var(--navbar-height));

display: flex;

& > span {

	flex: 1;

	display: flex;
	flex-direction: column;

	& > .video {
		flex: 1;
	}
}

`

export default Style

export const Timeline = styled.div`

height: ${props => props.minimized ? `5rem` : `30vh`};

border-right: 1px solid #ccc;

transition: height .5s cubic-bezier(0, 0, 0, 1.07);

& > header {
	height: 5rem;
	border-bottom: 1px solid #ccc;
	border-top: 1px solid #ccc;
}

`

export const EventList = styled.div`

width: 35rem;
height: calc(100vh - var(--navbar-height));

& > header {

	height: 5rem;
	background: var(--navy-blue);

	display: flex;

	border-bottom: 5px solid var(--light-blue);

	& > .carat {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 1rem;
	}

	& > .tab {
		height: 5rem;
		width: 7rem;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;

		font-weight: 500;

		&.active {
			background: var(--light-blue);
		}
	}
}

& > .breadcrumbs {

	height: 5rem;

	display: flex;
	position: relative;

	box-sizing: border-box;

	border-bottom: 1px solid #ccc;

	color: var(--navy-blue);
	font-weight: 500;

	& > span {
		height: 100%;
		width: 7rem;
		display: flex;
		justify-content: center;
		align-items: center;

		border: none;
		padding: 0;
		margin: 0;

		&.carat {
			position: absolute;
			left: 6.5rem;
			top: 1.9rem;
			height: 1rem;
			width: 1rem;
			transform: rotate(45deg);
			border-top: 1px solid #ccc;
			border-right: 1px solid #ccc;
			background-color: white;
		}

		&.current {
			flex: 1;
			justify-content: flex-start;
			padding-left: 2rem;
			border-left: 1px solid #ccc;
		}
	}
}

`

export const EventListCarat = styled.button`
	height: 2rem;
	width: 2rem;
	border: none;
	outline: none;
	cursor: pointer;
	background: url(${carat}) center no-repeat;
	background-size: contain;
	padding: 0;

	transform: rotate(-90deg);
	transition: transform .25s ease-in-out;

	&.minimized {
		transform: rotate(90deg);
	}
`