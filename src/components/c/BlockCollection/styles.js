import styled from 'styled-components'

import arrowLeft from 'assets/arrow-left.svg'
import arrowRight from 'assets/arrow-right.svg'

export const Button = styled.button`
	background-size: contain;
	border: none;
	cursor: pointer;
	height: 2.5rem;
	outline: none;
	width: 20rem;
	border-radius: .5rem;

	&:hover {
		box-shadow: 0 3px 6px -2px #A0A0A0;
	}
`

export const Container = styled.div`
	padding: ${props => props.isOwner || props.isPublic === false ? `2rem` : `1.2rem 2rem 2rem 2rem`};

	border-top: 1px solid #ccc;

	& > div {
		position: relative;
	}
`

export const Header = styled.div`
	display: grid;
	grid-template-columns: 18rem 15rem auto 12.5rem;
	justify-items: start;
	align-items: center;
	padding-bottom: 2rem;

	p {
		color: #a4a4a4;
	}

	& a {
		color: black;
		font-weight: 500;
		font-size: 1.17em;
		text-decoration: none;
	}
`

export const SlideWrapper = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: ${props => `repeat(${props.count}, 17.8rem)`};
	grid-gap: 5rem;

	overflow-x: scroll;
	overflow-y: hidden;

	will-change: overflow;

	scroll-behavior: smooth;

	::-webkit-scrollbar {
		background: transparent;
	}

	& > a:last-child {
		margin-right: 6rem;
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
		right: ${props => props.hideRight ? `-100rem` : `0`};

		opacity: ${props => props.right ? `0` : `1`};
		transition: opacity .25s ease-in-out;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

		& > div {
			height: 1.5rem;
			width: 1.5rem;

			opacity: ${props => props.right ? `0` : `1`};
			transition: opacity .25s ease-in-out;

			background-image: url(${arrowRight});
			background-size: cover;
		}
	}

	&.left {
		left: ${props => props.hideLeft ? `-100rem` : `0`};

		opacity: ${props => props.left ? `0` : `1`};
		transition: opacity .25s ease-in-out;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

		& > div {
			height: 1.5rem;
			width: 1.5rem;

			opacity: ${props => props.right ? `0` : `1`};
			transition: opacity .25s ease-in-out;

			background-image: url(${arrowLeft});
			background-size: cover;
		}
	}
`

export const BlockEnd = styled.div`
	width: .1rem;
	height: 10rem;
`

export const PublicCollectionButton = styled.div`

	& > h3 {
		width: 100%;
		text-align: end !important;
		margin-right: 1rem;
		font-weight: lighter;
		font-size: 1.2rem;
	}
	& > #collection-owned {
		font-size: 1.2rem;
		font-weight: bold;
	}
`

export const PublicButton = styled.button`
	font-size: 1rem;
	color: ${props => props.isSubscribed === true ? `var(--red)` : `#efefef`};
	background-color: ${props => props.isSubscribed === true ? `white` : `var(--light-yellow)`};

	border: ${props => props.isSubscribed === true ? `.25rem solid var(--red)` : `none`};
	margin: 0rem 1rem 0rem 1rem;
  padding: ${props => props.isSubscribed === true ? `0.55rem 1.5rem` : `0.8rem 1.5rem`};

  letter-spacing: 0.05rem;

  border-radius: 0.5rem;

  cursor: pointer;
  outline: none;

	:hover {
		background-color: ${props => props.isSubscribed === true ? `var(--red)` : `var(--yellow)`};
		color: #ffffff;
	}

	& > h3 {
		font-weight: lighter;
	}
`