import React, { PureComponent, useState } from 'react'

import { ListItem } from 'components/bits'

import Style, { Collection, Body, PublicButton, CollectionRow } from './styles'

class PublicListCollection extends PureComponent {

	render() {

		const {
			collection,
			isOpen,
			subscribeStatus,
		} = this.props.viewstate

		const {
			isOpenEventHandler,
			addPublicCollection,
		} = this.props.handlers

		if (!collection) return null

		return (
			<Style>
				<CollectionRow>
					<PublicButton
						public={collection.public}
						onClick={addPublicCollection}
						className={`public-button`}
					>
						{!subscribeStatus ? `Add` : `Remove`}
					</PublicButton>

					{/* TODO: public collection is not attached to the user, how do we track if this is subscribed by which users */}
					<Collection className='list-header' isOpen={isOpen} onClick={isOpenEventHandler} >
						<h3>{collection.name}</h3>
						{collection.content ? (
							<p>{collection.content.length} Videos</p>
						):(
							<p>0 Videos</p>
						)}
						<div />
					</Collection>
				</CollectionRow>

				{collection.content ? (
					<Body isOpen={isOpen} count={collection.content.length}>
						{
							collection.content.map(item => {
								return <ListItem key={item.id} data={item} />
							})
						}
					</Body>
				):(
					<></>
				)}
			</Style>
		)
	}
}

export default PublicListCollection