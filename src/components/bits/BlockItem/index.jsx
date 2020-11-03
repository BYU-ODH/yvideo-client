import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { ItemContainer, Thumbnail } from './styles.js'

export default class BlockItem extends Component {

	render() {
		const { name, id, thumbnail } = this.props.data

		return (
			<ItemContainer>
				<Link to={`/player/${id}`}>
					<Thumbnail src={thumbnail}/>
					<h4>{name}</h4>
				</Link>
			</ItemContainer>
		)
	}
}
