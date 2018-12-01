import React from 'react'
import styled from 'styled-components'
// import breakpoint from 'styled-components-breakpoint'

import PreviewIcon from './icon.svg'

const StyledCollectionContainer =
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

	StyledCollectionPreview = styled.div`
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
			box-shadow: 0px .4rem .7rem -.2rem rgba(0,0,0,0.5);
			margin-top: -.3rem;
			margin-bottom: .3rem;
		}
	`,

	StyledIconBox = styled.div`
		height: 10rem;
		width: 8rem;
		background-color: rgba(0,0,0,.60);
		display: flex;
		justify-content: center;
		align-items: center;

		& svg {
			cursor: pointer;
		}
	`,

	// eslint-disable-next-line sort-vars
	CollectionPreview = props => {
		return (
			<StyledCollectionContainer>
				<StyledCollectionPreview thumb={props.thumb} >
					<StyledIconBox>
						<embed src={PreviewIcon} />
					</StyledIconBox>
				</StyledCollectionPreview>
				<p>{props.name}</p>
				<p className='gray'>{props.length} Videos</p>
			</StyledCollectionContainer>
		)
	}

export default CollectionPreview
