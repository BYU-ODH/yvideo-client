import React, { PureComponent } from 'react'

import { ListItem } from 'components/bits'

import Style, { Collection, Body, PublicButton, CollectionRow, PublicCollectionButton, PublicCollectionsLable } from './styles'

class PublicMoreListCollection extends PureComponent {

	render() {

		const {
			collection,
			isOwner,
			isOpen,
			contentsCount,
		} = this.props.viewstate

		const {
			isOpenEventHandler,
			handlePublicCollection,
		} = this.props.handlers

		if (!collection) return null

		return (
			<Style>
				<CollectionRow>
					<Collection className='list-header' isOpen={isOpen} onClick={isOpenEventHandler} >
						<h3>{collection.name}</h3>
					</Collection>
				</CollectionRow>

				{collection.content ? (
					<Body isOpen={isOpen} count={contentsCount}>
						<PublicCollectionsLable>
							<PublicCollectionButton>
								<PublicButton
									onClick={handlePublicCollection}
									className='public-button'
								>
									{isOwner ? <>Unsubscribe</> : <>Subscribe</>}
								</PublicButton>
							</PublicCollectionButton>
						</PublicCollectionsLable>

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

export default PublicMoreListCollection