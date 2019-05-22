import styled, { keyframes, css } from 'styled-components'

import translation from 'assets/collections/videoOptions/translation.svg'
import captions from 'assets/collections/videoOptions/captions.svg'
import annotations from 'assets/collections/videoOptions/annotations.svg'

export const Container = styled.div`
	padding: 2rem;
`

export const Preview = styled.div`

	display: flex;

	& > div:nth-child(1) {
		min-width: 14rem;
	}

	& > div:nth-child(2) {

		flex: 1;

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		& > h4 {
			font-weight: normal;
			text-overflow: ellipsis;
		}

		& ul {
			margin: 0;
			padding: 0;

			display: grid;
			grid-template-columns: repeat(3, 2rem);
			grid-gap: .5rem;
		}

		& em {
			font-weight: lighter;
		}
	}

	& > div:nth-child(3) {
		display: flex;
		justify-content: flex-end;
	}
`

export const EditButton = styled.button`
	background: transparent;
	border: none;
	color: #0582CA;
	outline: none;
	height: fit-content;
	cursor: pointer;
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

export const Thumbnail = styled.div`
	width: 10rem;
	height: 6.1rem;

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

const shimmer = keyframes`
	0% {
	background-position: -30rem 0;
	}
	100% {
		background-position: 30rem 0;
	}
`