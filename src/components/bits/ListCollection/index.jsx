import React, { PureComponent } from 'react'

import { ListItem } from 'components/bits'

import { Header, Body } from './styles'

class ListCollection extends PureComponent {
	state = {
		isOpen: false,
	}

	togglePanel = () => {
		this.setState(prevState => ({ isOpen: !prevState.isOpen }))
	}

	render() {
		const {
			isOpen,
		} = this.state

		const {
			name,
			content,
		} = this.props.collection

		const contentIds = this.props.contentIds

		const publishContent = content.filter(item => item.published)

		if (!content || this.props.collection.published !== true ) return null

		return (
			<div>
				<Header isOpen={isOpen} onClick={this.togglePanel} >
					<h3>{name}</h3>
					<p>{publishContent.length} Videos</p>
					<div />
				</Header>
				<Body isOpen={isOpen} count={publishContent.length}>
					{
						publishContent.map(item => {
							return <ListItem key={item.id} data={item} />
						})
					}
				</Body>
			</div>
		)
	}
}

export default ListCollection