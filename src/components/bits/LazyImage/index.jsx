import React from 'react'

import Style from './styles'

import Image from 'react-bootstrap/Image'

const LazyImage =
	({
		src,
		alt = ``,
		height = `10rem`,
		width = `17.8rem`,
		heightSm = `50.5vw`,
		widthSm = `90vw`,
	}) => {

		return (
			<Style
				height={height}
				width={width}
				heightSm={heightSm}
				widthSm={widthSm}
			>
				{src &&
					<Image
						src={src}
						alt={alt}
					fluid />
				}
			</Style>
		)
	}

export default LazyImage
