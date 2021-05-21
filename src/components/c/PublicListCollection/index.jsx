import React, { PureComponent } from 'react'

import { ListItem } from 'components/bits'

import Style, { Collection, Body, PublicButton, CollectionRow, PublicCollectionButton, PublicCollectionsLable } from './styles'

class PublicListCollection extends PureComponent {

	render() {

		const {
			collection,
			isOpen,
			isAdmin,
			contentsCount,
			ownerName,
			isSubscribed
		} = this.props.viewstate

		const {
			isOpenEventHandler,
			handlePublicCollection,
		} = this.props.handlers
		console.log(collection)
		console.log(isSubscribed)

		if (!collection) return null

		return (
			<Style>
				<CollectionRow>
					{/* TODO: public collection is not attached to the user, how do we track if this is subscribed by which users */}
					<Collection className='list-header' isOpen={isOpen} onClick={isOpenEventHandler} >
						<h3>{collection.name}</h3>
						<p>{contentsCount} Videos</p>
					</Collection>
				</CollectionRow>

				{collection.content && contentsCount > 0 ? (
					<Body isOpen={isOpen} count={contentsCount}>
						{isAdmin ? (
							<PublicCollectionsLable>
								<div className='owner-name'>
									{/* {ownerName[ownerName.length-1] === `s` ?
										<>{ownerName}' collection</>
										:
										<>{ownerName}'s collection</>
									} */}
									{ownerName}'s collection
								</div>
								<PublicCollectionButton>
									<PublicButton
										onClick={handlePublicCollection}
										className={`public-button`}
									>
										{isSubscribed ? <>Unsubscribe</> : <>Subscribee</>}
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