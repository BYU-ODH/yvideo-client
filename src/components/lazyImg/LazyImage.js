import React from 'react'

import { Container } from './styles'

const LazyImage =
	({
		src,
		alt = ``,
		height = `10rem`,
		width = `17.8rem`,
		heightSm = `50.5vw`,
		widthSm = `90vw`
	}) => {
	return (
		<Container
			height={height}
			width={width}
			heightSm={heightSm}
			widthSm={widthSm}
		>
			<img
				src={src}
				alt={alt}
			/>
		</Container>
	)
}

export default LazyImage
