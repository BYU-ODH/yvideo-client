import React from 'react'
import styled from 'styled-components'

const StyledBlockCollectionItem = styled.div`
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
