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
		} = this.props.data

		if (!content) return null

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
							return <ListItem key={item.id} data={item} />
						})
					}
				</Body>
			</div>
		)
	}
}

export default ListCollection