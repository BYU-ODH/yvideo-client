import React, { Component } from 'react'

import { PreviewCollectionContainer, Wrapper, IconBox } from './styles'

import PreviewIcon from './../../../assets/icon.svg'

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
		const { thumbnail, name, contentCount } = this.props.data
		return (
			<PreviewCollectionContainer>
				<Wrapper src={thumbnail} loaded={this.state.loaded}>
					<IconBox>
						<embed src={PreviewIcon} />
					</IconBox>
				</Wrapper>
				<p>{name}</p>
				<p className='gray'>{contentCount} Videos</p>
			</PreviewCollectionContainer>
		)
	}
}

export default PreviewCollection
