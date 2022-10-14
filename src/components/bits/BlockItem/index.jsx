import React from 'react'

import { Link } from 'react-router-dom'

import { LazyImage } from 'components/bits'

import defaultThumbnail from 'assets/default-thumb.svg'

import { ItemContainer } from './styles.js'

const BlockItem = props => {

	const { name, id, thumbnail } = props.data

	return (
		<ItemContainer>
			<Link to={`/player/${id}`}>
				<LazyImage
					src={thumbnail !== `empty` ? thumbnail : defaultThumbnail}
				/>
				<h4>{name}</h4>
			</Link>
		</ItemContainer>
	)
}

export default BlockItem
