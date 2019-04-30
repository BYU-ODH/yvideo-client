import React, { Component } from 'react'

import { Container, Icon, Preview } from './styles'

class ListItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			img: props.data.thumbnail,
			loaded: false
		}
	}

	componentDidMount = () => {
		const temp = new Image()
		temp.src = this.state.img
		temp.onload = () => {
			this.setState({ loaded: true })
		}
	}

	render() {
		const { name, thumbnail, translation, captions, annotations } = this.props.data
		const { loaded } = this.state

		return (
			<Container to='/'>
				<Preview src={thumbnail} loaded={loaded} />
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