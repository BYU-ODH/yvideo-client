import React from 'react'
import { ItemContainer, Thumbnail } from './styles.js'

const BlockItem = props => {
	const { name, thumbnail } = { ...props.data }
	return (
		<ItemContainer>
			{thumbnail ?
				<Thumbnail className='src' src={thumbnail} />
				:
				<Thumbnail className='default' />
			}
			<h4>{name}</h4>
		</ItemContainer>
	)
}

export default BlockItem
