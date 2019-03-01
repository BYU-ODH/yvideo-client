import React from 'react'

import { PreviewVideoContainer, Preview } from './styles'

const PreviewVideo = props => {
	const { thumbnail, name, collection } = { ...props.data }
	return (
		<PreviewVideoContainer>
			<Preview thumb={thumbnail} />
			<p>{name}</p>
			<p className='gray'>{collection}</p>
		</PreviewVideoContainer>
	)
}

export default PreviewVideo
