import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { ItemContainer } from './styles'
import LazyImage from 'components/lazyImg/LazyImage'

class BlockItem extends Component {
	render() {

		const { name, id, thumbnail } = this.props.data

		return (
			<ItemContainer>
				<Link to={`/player/${id}`}>
					<LazyImage src={thumbnail} />
					<h4>{name}</h4>
				</Link>
			</ItemContainer>
		)
	}
}

export default BlockItem
