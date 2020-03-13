import React from 'react'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
0% {
	background-position: -30rem 0;
}
100% {
		background-position: 30rem 0;
}
`,

	Container = styled.div`
		& h4 {
			font-weight: 500;
		}
	`,

	Thumbnail = styled.div`
		background-color: gray;
		background-image: url(${props => props.src}) center no-repeat;
		background-size: cover;

		width: 17.8rem;
		height: 10rem;

		margin-bottom: 1rem;
		
		animation: ${shimmer} 2s linear infinite;
		animation-fill-mode: forwards;

		background-color: #eee;
		background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
		background-repeat: no-repeat;
	`

const BlockItem = props => {
	const { name, thumbnail } = { ...props.data }
	return (
		<Container>
			<Thumbnail src={thumbnail} />
			<h4>{name}</h4>
		</Container>
	)
}

export default BlockItem
