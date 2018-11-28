import React from 'react'
import styled from 'styled-components'

const StyledVideoContainer =
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
	`,

	StyledVideoPreview = styled.div`
		background-image: url(${ props => props.thumb});
		background-size: cover;
		background-position: center;
		background-color: gray;
		height: 10rem;
		width: 17.8rem;
		display: flex;
		flex-direction: row-reverse;
	`,

	// eslint-disable-next-line sort-vars
	VideoPreview = props => {
		return (
			<StyledVideoContainer>
				<StyledVideoPreview thumb={props.thumb} />
				<p>{props.name}</p>
				<p className='gray'>{props.collection}</p>
			</StyledVideoContainer>
		)
	}

export default VideoPreview
