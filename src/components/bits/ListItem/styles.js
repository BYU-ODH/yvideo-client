import styled from 'styled-components'

import translation from 'assets/translation.svg'
import captions from 'assets/captions.svg'
import annotations from 'assets/annotations.svg'

export const Style = styled.div`
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
