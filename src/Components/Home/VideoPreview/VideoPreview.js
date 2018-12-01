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

		:hover {
			cursor: pointer;
			text-decoration: underline;
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
		transition: all .1s;

		:hover {
			box-shadow: 0px .4rem .7rem -.1rem rgba(0,0,0,0.5);
			margin-top: -.3rem;
			margin-bottom: .3rem;
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
