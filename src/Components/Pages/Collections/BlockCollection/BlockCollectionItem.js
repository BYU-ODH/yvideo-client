import React from 'react'
import styled, { keyframes } from 'styled-components'

const Shimmer = keyframes`
0% {
	background-position: -30rem 0;
}
100% {
		background-position: 30rem 0;
}
`,

	StyledBlockCollectionItem = styled.div`
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
		
		animation: ${Shimmer} 2s linear infinite;
		animation-fill-mode: forwards;

		background-color: #eee;
		background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
		background-repeat: no-repeat;
	`

const BlockCollectionItem = props => {
	const { name, thumbnail } = { ...props.data }
	return (
		<StyledBlockCollectionItem>
			<Thumbnail src={thumbnail} />
			<h4>{name}</h4>
		</StyledBlockCollectionItem>
	)
}

export default BlockCollectionItem
