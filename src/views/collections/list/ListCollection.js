import React, { Component } from 'react'

import ListItem from './ListItem'

import { Header, Body } from './styles'

class ListCollection extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isOpen: false
		}
	}

	togglePanel = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	render() {
		const { isOpen } = this.state
		const { name, content } = this.props.data

		return (
			<div>
				<Header isOpen={isOpen} onClick={this.togglePanel} >
					<h4>{name}</h4>
					<p>{content.length} Videos</p>
					<div />
				</Header>
				<Body isOpen={isOpen} count={content.length}>
					{
						content.map(item => {
							const translation = false
							const captions = false
							const annotations = false
							return <ListItem key={item.id} data={{ ...item, translation, captions, annotations }} />
						})
					}
				</Body>
			</div>
		)
	}
}

export default ListCollection