import styled from 'styled-components'

import translation from 'assets/translation.svg'
import captions from 'assets/captions.svg'
import annotations from 'assets/annotations.svg'
import carrot from 'assets/carrot.svg'

const Style = styled.div`
  display: inline;
`
export default Style

export const Header = styled.div`
	display: grid;
	grid-template-columns: 18rem auto 1.5rem;
	justify-items: start;

	padding: 2rem;
	border-top: 1px solid #ccc;

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

	:hover {
		cursor: pointer;
		background: #efefef;
	}
`

export const Body = styled.div`
	/* height: ${props => props.isOpen ? `${(parseInt(props.count) * 6.5 + 2).toString()}rem` : `0`}; */
	height: ${props => props.isOpen ? `auto` : `0`};
	transition: height .25s ease-in-out;
	overflow: hidden;
`
export const Clip = styled.div`
		display: grid;
		grid-template-columns: 18rem auto;
		align-items: center;
		height: 3.5rem;
		padding: 1.5rem 2rem;

		color: black;
		text-decoration: none;

		:hover {
			background: #eee;
			cursor: pointer;
		}

		& .name h4 {
			font-weight: 300;
		}
		& div h4 {
			font-weight:300;
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
