import React, { Component } from 'react'

import { Preview } from './styles'

import { Link } from 'react-router-dom'

import LazyImage from 'components/lazyImg/LazyImage'

class PreviewVideo extends Component {
	render() {
		const { thumbnail, name, collection, id } = this.props.data

		return (
			<Link to={`/player/${id}`}>
				<Preview>
					<LazyImage src={thumbnail} />
					<p>{name}</p>
					<p className='gray'>{collection}</p>
				</Preview>
			</Link>
		)
	}
}

export default PreviewVideo
