import styled, { keyframes, css } from 'styled-components'

import { Link } from 'react-router-dom'

import carrot from './../../../assets/collections/carrot.svg'
import translation from './../../../assets/collections/videoOptions/translation.svg'
import captions from './../../../assets/collections/videoOptions/captions.svg'
import annotations from './../../../assets/collections/videoOptions/annotations.svg'

export const Header = styled.div`
	display: grid;
	grid-template-columns: 18rem auto 1.5rem;
	justify-items: start;

	padding: 2rem;

	border-top: 1px solid #ccc;

	& > div {
		flex: 1;

		background: url(${carrot}) center no-repeat;
		background-size: contain;
		height: 1.5rem;
		width: 1.5rem;

		transform: ${props => props.isOpen ? `rotate(-180deg)` : `rotate(0deg)`};
		transition: transform .25s ease-in-out;
	}

	& > h4 {
		flex: 2;
		font-weight: 500;
	}

	& > p {
		flex: 2;
		color: #a4a4a4;
	}

	:hover {
		cursor: pointer;
		text-decoration: underline;
		background: #efefef;
	}
`

export const Body = styled.div`
	height: ${props => props.isOpen ? (parseInt(props.count) * 6.5 + 2).toString() + `rem` : `0`};
	transition: height .25s ease-in-out;
	overflow: hidden;
`

const shimmer = keyframes`
	0% {
		background-position: -10rem 0;
	}
	100% {
			background-position: 10rem 0;
	}
`

export const Container = styled(Link)`
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
		font-weight: 500;
	}

	& ul {
		margin: 0;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(3, 2rem);
		grid-gap: .5rem;
	}
`

export const Preview = styled.div`
	height: 3.5rem;
	width: 5.5rem;

	${
	props => !props.loaded ?
		css`
			animation: ${shimmer} 2s linear 1s infinite;
			animation-fill-mode: forwards;
			background-color: #eee;
			background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
			background-repeat: no-repeat;
		`
		:
		css`
			background: url(${props => props.src}) center no-repeat;
			background-color: gray;
			background-size: cover;
		`
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
