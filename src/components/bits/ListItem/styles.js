import styled from 'styled-components'

import translation from 'assets/translation.svg'
import captions from 'assets/captions.svg'
import annotations from 'assets/annotations.svg'
import carrot from 'assets/carrot.svg'

export const Style = styled.div`
	border-top: 1px solid #ccc;
	background: #efefef;
	:hover {
		background: #d7d7d7;
		cursor: pointer;
	}

	& > a {
		display: grid;
		grid-template-columns: 18rem auto;
		align-items: center;
		height: 3.5rem;
		padding: 1.5rem 2rem;

		color: black;
		text-decoration: none;
		margin: 0 9rem;

		& .name h4 {
			font-weight: 500;
		}
		@media screen and (max-width: 425px){
			margin: 0 1rem;
			grid-template-columns: 8rem auto;
		}
		& ul {
			margin: 0;
			padding: 0;

			display: grid;
			grid-template-columns: repeat(3, 2rem);
			grid-gap: .5rem;
		}
	}
`

export default Style

export const Header = styled.div`
	border-top: 1px solid #ccc;
	background: #efefef;

	:hover {
		cursor: pointer;
		background: #d7d7d7;
	}

	& > .list-header-content {
		display: grid;
		grid-template-columns: 18rem auto 1.5rem;
		justify-items: start;
		align-items: center;
		margin: 0 9rem;
		padding: 2rem;

		& > span {
			flex: 1;

			background: url(${carrot}) center no-repeat;
			background-size: contain;
			height: 1.5rem;
			width: 1.5rem;

			transform: ${props => props.isOpen ? `rotate(-180deg)` : `rotate(0deg)`};
			transition: transform .25s ease-in-out;
		}
		& >.name h4 {
			font-weight:500;
		}
		& > h3 {
			flex: 2;
			font-weight: 500;
		}

		& > p {
			flex: 2;
			color: #a4a4a4;
		}
		@media screen and (max-width: 425px){
			margin: 0 1rem;
			grid-template-columns: 8rem auto 1.5rem;
		}
	}
`

export const Icon = styled.li`
	width: 2rem;
	height: 2rem;
	background-size: contain;
	list-style: none;

	&.translation {
		background: url(${translation}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}
	&.captions {
		background: url(${captions}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}
	&.annotations {
		background: url(${annotations}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}
`
