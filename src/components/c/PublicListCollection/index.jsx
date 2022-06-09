import React, { PureComponent } from 'react'

import { ListItem } from 'components/bits'

import Style, { Collection, Body, PublicButton, FeedbackMessage, CollectionRow, PublicCollectionButton, PublicCollectionsLable } from './styles'

class PublicListCollection extends PureComponent {

	render() {

		const {
			user,
			collection,
			isOpen,
			// ownerName,
			isSubscribed,
			isOwner,
		} = this.props.viewstate

		const {
			isOpenEventHandler,
			handlePublicCollection,
		} = this.props.handlers

		if (!collection || collection === undefined) return null

		return (
			<Style>
				<CollectionRow>
					<Collection className='list-header' isOpen={isOpen} onClick={isOpenEventHandler} >
						<h3>{collection.name}</h3>
						{
							collection.content.length === 0 ? (
								<p>The collection is empty</p>
							)
								:
								collection.content.length === 1 ? (
									<p>1 item</p>
								)
									:
									<p>{collection.content.length} items</p>
						}
						<div />
					</Collection>
				</CollectionRow>

				{collection.content && (user !== undefined && user !== null) ? (
					<Body isOpen={isOpen}>
						{user.roles < 4 &&
							<PublicCollectionsLable>

								<div className='ownership'>
									{/* <>Owner: <div className='owner-name'>{ownerName}</div></>
									<>Copyright: <div className='owner-name'>{collection.copyrighted ? `Yes` : `No`}</div></> */}
								</div>

								<PublicCollectionButton>
									{/* TODO: possibely add */}
									{/* <MoreButton className='more-button' onClick={handleMorePublicCollection}>more</MoreButton> */}
									{!isOwner ?
										<PublicButton
											onClick={handlePublicCollection}
											className='public-button'
										>
											{isSubscribed ?
												<h3>Unsubscribe</h3>
												:
												<h3>Subscribe</h3>}
										</PublicButton>
										:
										<h3>You own this collection</h3>
									}
								</PublicCollectionButton>
							</PublicCollectionsLable>
						}

						{ collection.content.length > 0 ?
							collection.content.map(item => {
								return <ListItem key={item.id} data={item} />
							})
							:
							<FeedbackMessage><p>This collection has no content</p></FeedbackMessage>
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