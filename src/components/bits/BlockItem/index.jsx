import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { LazyImage } from 'components/bits'

import defaultThumbnail from 'assets/default-thumb.svg'

import { ItemContainer } from './styles.js'

export default class BlockItem extends Component {

	render() {
		const { name, id, thumbnail } = this.props.data

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
}
