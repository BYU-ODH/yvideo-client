import React, { PureComponent } from 'react'

import { ListItem } from 'components/bits'

import Style, { Collection, Body, PublicButton, MoreButton, CollectionRow, PublicCollectionButton, PublicCollectionsLable } from './styles'

class PublicListCollection extends PureComponent {

	render() {

		const {
			collection,
			isOwner,
			isOpen,
			isAdmin,
			contentsCount,
			ownerName,
		} = this.props.viewstate

		const {
			isOpenEventHandler,
			handlePublicCollection,
			handleMorePublicCollection,
		} = this.props.handlers

		if (!collection) return null

		return (
			<Style>
				<CollectionRow>
					{/* TODO: public collection is not attached to the user, how do we track if this is subscribed by which users */}
					<Collection className='list-header' isOpen={isOpen} onClick={isOpenEventHandler} >
						<h3>{collection.name}</h3>
					</Collection>
				</CollectionRow>

				{collection.content ? (
					<Body isOpen={isOpen} count={contentsCount}>
						{isAdmin ? (
							<PublicCollectionsLable>
								<div className='ownership'>
									Owner: <div className='owner-name'>{ownerName}</div>
								</div>
								<PublicCollectionButton>
									{/* TODO: possibely add */}
									{/* <MoreButton className='more-button' onClick={handleMorePublicCollection}>more</MoreButton> */}
									<PublicButton
										onClick={handlePublicCollection}
										className={`public-button`}
									>
										{isOwner ? <>Unsubscribe</> : <>Subscribe</>} {/* needs to be changed => whether or not subscribed*/}
									</PublicButton>
								</PublicCollectionButton>
							</PublicCollectionsLable>
						) : null
						}
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