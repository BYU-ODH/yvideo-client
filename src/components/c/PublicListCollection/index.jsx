import React, { PureComponent } from 'react'

import { ListItem, ListItemDropDown } from 'components/bits'

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

		const theContent = collection.content.sort((a, b) => {
			return a.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) > b.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) ?
				1 : -1
		})

		return (
			<Style>
				<CollectionRow>
					<Collection className='list-header' isOpen={isOpen} onClick={isOpenEventHandler} >
						<h3>{collection.name}</h3>
						{
							theContent.length === 0 ? (
								<p>The collection is empty</p>

							)
								:
								theContent.length === 1 ? (
									<>
										<p>1 item</p>
										<p>Owned</p>
									</>
								)
									:
									<p>{theContent.length} items</p>
						}
						{/* { isOwner ?
							<p>haha</p>
							:
							<p>(Subscribed)</p>

						} */}
						<div />
					</Collection>
				</CollectionRow>

				{theContent && (user !== undefined && user !== null) ? (
					<Body isOpen={isOpen}>
						{user.roles < 4 &&
							<PublicCollectionsLable>

								<PublicCollectionButton>
									{/* TODO: possibely add */}
									{/* <MoreButton className='more-button' onClick={handleMorePublicCollection}>more</MoreButton> */}
									{!isOwner ?
										<PublicButton
											onClick={handlePublicCollection}
											className={`public-button`}
										>
											{isSubscribed ?
												<h3>Unsubscribe</h3>
												:
												<h3>Subscribe</h3>}
										</PublicButton>
										:
										<h3 id='collection-owned'>You own this collection</h3>
									}
								</PublicCollectionButton>
							</PublicCollectionsLable>
						}

						{ theContent.length > 0 ?
							theContent.map(item => {
								return (
									item.clips.length < 3 ?
										<ListItem key={item.id} data={item} />
										:
										<ListItemDropDown key={item.id} data={item} />
								)
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