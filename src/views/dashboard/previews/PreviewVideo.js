import React, { Component } from 'react'

import { Preview, PreviewBackground } from './styles'

class PreviewVideo extends Component {
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
		const { thumbnail, name, collection } = this.props.data
		const { loaded } = this.state
		return (
			<Preview>
				<PreviewBackground src={thumbnail} loaded={loaded} />
				<p>{name}</p>
				<p className='gray'>{collection}</p>
			</Preview>
		)
	}
}

export default PreviewVideo
