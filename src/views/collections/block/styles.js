import styled, { keyframes, css } from 'styled-components'

import arrowLeft from '../../../assets/collections/arrow-left.svg'
import arrowRight from '../../../assets/collections/arrow-right.svg'

export const Container = styled.div`
	padding: 2rem;

	& > div {
		position: relative;
	}
`

export const Header = styled.div`
	display: grid;
	grid-template-columns: 18rem auto;
	justify-items: start;
	padding-bottom: 2rem;

	& > p {
		color: #a4a4a4;
	}

	& a {
		color: black;
		text-decoration: none;
	}
`

export const SlideWrapper = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: ${props => `repeat(` + props.count + `, 17.8rem)`};
	grid-gap: 5rem;

	overflow-x: scroll;
	overflow-y: hidden;

	will-change: overflow;

	scroll-behavior: smooth;

	margin-right: 6rem;

	::-webkit-scrollbar {
		background: transparent;
	}

	& > div:last-child {
		padding-right: 6rem;
	}
`

export const Arrow = styled.div`

	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 0;

	height: 10rem;
	width: 6rem;

	cursor: pointer;

	&.right{
		right: 0;
		background-image: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));

		& > div {
			height: 1.5rem;
			width: 1.5rem;

			transition: opacity .25s ease-in-out;
			opacity: ${props => props.right ? `0` : `1`};
			background-image: url(${arrowRight});
			background-size: cover;
		}
	}

	&.left {
		left: ${props => props.hideLeft ? `-100rem` : `0`};

		transition: opacity .25s ease-in-out;
		opacity: ${props => props.left ? `0` : `1`};
		background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));

		& > div {
			height: 1.5rem;
			width: 1.5rem;

			transition: opacity .25s ease-in-out;
			opacity: ${props => props.left ? `0` : `1`};
			background-image: url(${arrowLeft});
			background-size: cover;
		}
	}
`

const shimmer = keyframes`
	0% {
	background-position: -30rem 0;
	}
	100% {
		background-position: 30rem 0;
	}
`

export const ItemContainer = styled.div`
	& h4 {
		font-weight: 500;
	}
`

export const Thumbnail = styled.div`
	width: 17.8rem;
	height: 10rem;

	margin-bottom: 1rem;

	${
	props => !props.loaded ?
		css`
			background-color: #eee;
			background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
			background-repeat: no-repeat;

			animation: ${shimmer} 2s linear infinite;
			animation-fill-mode: forwards;
		`
		:
		css`
			background-color: gray;
			background-image: url(${props => props.src});
			background-size: cover;
		`
	}
`
