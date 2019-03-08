import styled, { keyframes, css } from 'styled-components'

const shimmer = keyframes`
	0% {
		background-position: -30rem 0;
	}
	100% {
			background-position: 30rem 0;
	}
`

export const SPreviewVideo = styled.div`
	display: flex;
	flex-direction: column;

	& p {
		margin-top: 1rem;
		margin-bottom: 0;
	}

	& p.gray {
		color: #a4a4a4;
	}

	:hover {
		cursor: pointer;
	}
`

export const Preview = styled.div`
	height: 10rem;
	width: 17.8rem;
	display: flex;
	flex-direction: row-reverse;

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
export const SPreviewCollection = styled.div`
	display: flex;
	flex-direction: column;

	& p {
		margin-top: 1rem;
		margin-bottom: 0;
	}

	& p.gray {
		color: #a4a4a4;
	}

	:hover {
		cursor: pointer;
	}
`

export const Wrapper = styled.div`
	background-image: url(${ props => props.thumb});
	background-size: cover;
	background-position: center;
	height: 10rem;
	width: 17.8rem;
	display: flex;
	flex-direction: row-reverse;

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

export const IconBox = styled.div`
	height: 10rem;
	width: 8rem;
	background-color: rgba(0,0,0,.60);
	display: flex;
	justify-content: center;
	align-items: center;

	& svg {
		cursor: pointer;
	}
`