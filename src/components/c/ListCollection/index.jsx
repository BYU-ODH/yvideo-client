import React from 'react'

import { ListItem, ListItemDropDown } from 'components/bits'
import * as sortingRegex from 'components/common/sorting_regex'

import Style, { Collection, Body, PublicButton, FeedbackMessage, CollectionRow, PublicCollectionButton, PublicCollectionsTable } from './styles'

const ListCollection = props => {

	const {
		user,
		collection,
		isOpen,
		isSubscribed,
		isOwner,
	} = props.viewstate

	const {
		isOpenEventHandler,
		handlePublicCollection,
	} = props.handlers

	const {
		name,
		content,
	} = props.viewstate.collection

	if (!collection || collection === undefined)
		return null

	const publishContent = content ? content.filter(item => item.published) : []
	publishContent.sort((a, b) => {
		return a.name.toLowerCase().replace(sortingRegex, `$1`) > b.name.toLowerCase().replace(sortingRegex, `$1`) ?
			1 : -1
	})
	const count = publishContent.length

	return (
		!collection.public && collection.published ? (
			<Style>
				<CollectionRow>
					<Collection className='list-header' isOpen={isOpen} onClick={isOpenEventHandler}>
						<h3>{name}</h3>
						{ count === 0 ?
							<p>This collection is empty</p>
							:
							count === 1 ?
								<p>1 item</p>
								:
								<p>{count} items</p>
						}
						<p />
						<div />
					</Collection>
				</CollectionRow>
				{ publishContent && user && user !== null &&
					<Body
						isOpen={isOpen}
						count={count}
						isPublic={collection.public}>
						{
							publishContent.map(item => {
								return (
									item.clips.length < 3 ?
										<ListItem key={item.id} data={item} />
										:
										<ListItemDropDown key={item.id} data={item} isDropDown={true}/>
								)
							})
						}
					</Body>
				}
			</Style>
		)
			:
			collection.public && !collection.archived && (
				<Style>
					<CollectionRow>
						<Collection className='list-header' isOpen={isOpen} onClick={isOpenEventHandler} >
							<h3>{name}</h3>
							{
								count === 0 ?
									<p>The collection is empty</p>
									:
									count === 1 ?
										<p>1 item</p>
										:
										<p>{count} items</p>
							}
							{ isOwner ?
								<p>Owned</p>
								:
								isSubscribed ?
									<p>Subscribed</p>
									:
									<p>Not Subscribed</p>
							}
							<div />
						</Collection>
					</CollectionRow>

					{ publishContent && (user && user !== null) && (
						<Body isOpen={isOpen} count={count} isPublic={collection.public}>
							{user.roles < 4 &&
								<PublicCollectionsTable isOwner={isOwner}>

									<PublicCollectionButton>
										{!isOwner ?
											<PublicButton
												onClick={handlePublicCollection}
												className='public-button'
												isSubscribed={isSubscribed}
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
								</PublicCollectionsTable>
							}

							{ count > 0 ?
								publishContent.map(item => {
									return (
										item.clips.length < 3 ?
											<ListItem key={item.id} data={item} />
											:
											<ListItemDropDown key={item.id} data={item} isDropDown={true} />
									)
								})
								:
								<FeedbackMessage><p>This collection has no content</p></FeedbackMessage>
							}
						</Body>
					)}
				</Style>
			)
	)
}

export default ListCollection
