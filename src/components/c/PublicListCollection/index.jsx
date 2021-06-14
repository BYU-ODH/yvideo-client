import React, { PureComponent } from 'react'

import { ListItem } from 'components/bits'

import Style, { Collection, Body, PublicButton, MoreButton, CollectionRow, PublicCollectionButton, PublicCollectionsLable, NoContentFiller } from './styles'

class PublicListCollection extends PureComponent {

	render() {

		const {
			user,
			collection,
			isOpen,
			ownerName,
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
						<p>{collection.content.length} Contents</p>
						<div />
					</Collection>
				</CollectionRow>

				{collection.content && (user !== undefined && user !== null) ? (
					<Body isOpen={isOpen}>
						{user.roles < 3 &&
						<PublicCollectionsLable>

							<div className='ownership'>
								<>Owner: <div className='owner-name'>{ownerName}</div></>
								<>Copyright: <div className='owner-name'>{collection.copyrighted ? `Yes` : `No`}</div></>
							</div>

							<PublicCollectionButton>
								{/* TODO: possibely add */}
								{/* <MoreButton className='more-button' onClick={handleMorePublicCollection}>more</MoreButton> */}
								{!isOwner ?
									<PublicButton
										onClick={handlePublicCollection}
										className={`public-button`}
									>
										{isSubscribed ? <>Unsubscribe</> : <>Subscribe</>}
									</PublicButton>
									:
									<div>You own this collection</div>
								}
							</PublicCollectionButton>
						</PublicCollectionsLable>
						}

						{ collection.content.length > 0 ?
							collection.content.map(item => {
								return <ListItem key={item.id} data={item} />
							})
							:
							<NoContentFiller>This collection currently has no content</NoContentFiller>
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