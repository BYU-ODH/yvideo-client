import React, { Component } from 'react'

import { Container, Icon } from './styles'
import LazyImage from 'components/lazyImg/LazyImage'

class ListItem extends Component {
	render() {

		const { id, name, thumbnail, translation, captions, annotations } = this.props.data

		return (
			<Container to={`/player/${id}`}>
				<LazyImage src={thumbnail} height='3.5rem' width='5.5rem' heightSm='3.5rem' widthSm='5.5rem' />
				<div className='name'>
					<h4>{name}</h4>
					<ul>
						<Icon className='translation' checked={translation} />
						<Icon className='captions' checked={captions} />
						<Icon className='annotations' checked={annotations} />
					</ul>
				</div>
			</Container>
		)
	}
}

export default ListItem