import React from 'react'

import { PreviewCollectionContainer, Wrapper, IconBox } from './styles'

import PreviewIcon from './../../../assets/icon.svg'

const PreviewCollection = props => {
	return (
		<PreviewCollectionContainer>
			<Wrapper thumb={props.thumb} >
				<IconBox>
					<embed src={PreviewIcon} />
				</IconBox>
			</Wrapper>
			<p>{props.name}</p>
			<p className='gray'>{props.length} Videos</p>
		</PreviewCollectionContainer>
	)
}

export default PreviewCollection
