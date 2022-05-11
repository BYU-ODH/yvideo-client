import React, { PureComponent } from 'react'

import { ListItem, ListItemDropDown } from 'components/bits'

import Style, { Header, Body, /*PublicButton*/ } from './styles'

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

		// eslint-disable-next-line no-unused-vars
		const contentIds = this.props.contentIds

		const publishContent = content ? content.filter(item => item.published) : []

		publishContent.sort((a, b) => {
			return a.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) > b.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) ? 1 : -1
		})

		if (!content || this.props.collection.published !== true ) return null

		return (
			<Style>
				<Header className='list-header' isOpen={isOpen} onClick={this.togglePanel} >
					<h3>{name}</h3>
					{
						publishContent.length === 0 ? (
							<p>This collection is empty</p>
						)
							:
							publishContent.length === 1 ? (
								<p>1 item</p>
							)
								:
								<p>{publishContent.length} items</p>
					}
					<div />
				</Header>
				<Body isOpen={isOpen} count={publishContent.length}>
					{
						publishContent.map(item => {
							return item.clips.length < 3 ? <ListItem key={item.id} data={item}/> : <ListItemDropDown key={item.id} data={item}/>
						})
					}
				</Body>
			</Style>
		)
	}
}

export default ListCollection
