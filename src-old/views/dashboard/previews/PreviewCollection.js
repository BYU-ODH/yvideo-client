import React, { Component } from 'react'

import { Preview, IconBox } from './styles'

import { Link } from 'react-router-dom'

import PreviewIcon from 'assets/icon.svg'
import LazyImage from 'components/lazyImg/LazyImage'

class PreviewCollection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			img: props.data.thumbnail,
			title: props.data.title,
			loaded: false
		}
	}

	componentWillMount() {
		const temp = new Image()
		temp.src = this.state.img
		temp.onload = () => {
			this.setState({ loaded: true })
		}
	}

	render() {
		const { thumbnail, name, content } = this.props.data
		const contentCount = content.length

		return (
			<Link to={`/collections`}>
				<Preview>
					<LazyImage src={thumbnail} />

					<IconBox>
						<embed src={PreviewIcon} />
					</IconBox>

					<p>{name}</p>
					<p className='gray'>{contentCount} Video{contentCount === 1 || `s`}</p>
				</Preview>
			</Link>
		)
	}
}

export default PreviewCollection
