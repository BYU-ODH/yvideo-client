import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container =
	styled.div`
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
			/* text-decoration: underline; */
		}
	`,

	shimmer = keyframes`
		0% {
			background-position: -30rem 0;
		}
		100% {
				background-position: 30rem 0;
		}
	`,

	Preview = styled.div`
		background-image: url(${ props => props.thumb});
		background-size: cover;
		background-position: center;

		animation: ${shimmer} 2s linear 1s infinite;
		animation-fill-mode: forwards;

		background: #eee;
		background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
		background-repeat: no-repeat;

		height: 10rem;
		width: 17.8rem;
		display: flex;
		flex-direction: row-reverse;
	`,

	// eslint-disable-next-line sort-vars
	PreviewVideo = props => {
		const { thumbnail, name, collection } = { ...props.data }
		return (
			<Container>
				<Preview thumb={thumbnail} />
				<p>{name}</p>
				<p className='gray'>{collection}</p>
			</Container>
		)
	}

export default PreviewVideo
