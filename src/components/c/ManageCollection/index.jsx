import React from 'react'

import {
	ContentOverviewContainer,
	CollectionPermissionsContainer,
} from 'containers'

import * as sortingRegex from 'components/common/sorting_regex'

import Style, {
	Title,
	TitleEdit,
	TitleEditButton,
	PublishButton,
	ArchiveButton,
	TabHeader,
	Selector,
	Tab,
	NewContent,
	Icon,
	Publish,
	Spinner,
} from './styles'

const ManageCollection = props => {
	const {
		user,
		collection,
		collectionName,
		isEditingCollectionName,
		isContentTab,
		content,
		isLabAssistant,
	} = props.viewstate

	const {
		unarchive,
		toggleEdit,
		handleNameChange,
		togglePublish,
		archive,
		setTab,
		createContent,
		handleShowTip,
		toggleTip,
	} = props.handlers

	content.sort((a, b) => {
		return a.name.toLowerCase().replace(sortingRegex, `$1`) > b.name.toLowerCase().replace(sortingRegex, `$1`) ? 1 : -1
	})

	return (
		<Style>
			<header>
				<Title>
					{isEditingCollectionName ? (
						// TODO When switching between collections, it uses the same value
						<TitleEdit
							type='text'
							id='title-edit'
							value={collectionName}
							contenteditable='true'
							onChange={handleNameChange}
							onKeyPress={event => {
								if (event.key === `Enter`) toggleEdit()
							}}
							size={collectionName.length > 0 ? collectionName.length : 1}
							autoFocus
						/>
					) : (
						<h6 onClick={user?.roles <= 2 ? e => toggleEdit(e) : null}>{collectionName}</h6>
					)}
					{user?.roles <= 2 &&
						<TitleEditButton
							id='title-edit-button'
							editing={isEditingCollectionName}
							onClick={toggleEdit}
							onMouseEnter={e => handleShowTip(`collection-edit-name`,
								{
									x: e.target.getBoundingClientRect().x,
									y: e.target.getBoundingClientRect().y,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()}
						>
							{isEditingCollectionName ? [<i className='fa fa-save'></i>, `Save`] : `Edit`}
						</TitleEditButton>
					}
				</Title>
				<Publish>
					{collection.archived ?
						<>
							{ user?.roles !== undefined ?
								<>
									{ user.roles <= 2 &&
										<ArchiveButton id={`archive-button`} className={`std-outline-color`} archived={collection.archived} onClick={unarchive}>Unarchive</ArchiveButton>
									}
								</>
								: null
							}
						</>
						:
						<>
							{ !collection.public && user?.roles <= 2 ?
								<PublishButton
									published={collection.published}
									onClick={togglePublish}
									id='publish-button'
									className='std-outline-color'
								>
									{collection.published ? `Unpublish` : `Publish`}
								</PublishButton>
								:
								<></>
							}
							{ user?.roles <= 2 &&
								<ArchiveButton id={`archive-button`} className={`std-outline-color`} archived={collection.archived} onClick={archive}>Archive</ArchiveButton>
							}
						</>
					}
				</Publish>
			</header>
			<TabHeader>
				<button id={`content-button`} className={`std-outline-color`} onClick={setTab(true)}>Content</button>
				{user?.roles <= 2 &&
					<button id={`permissions-button`} className={`std-outline-color`} onClick={setTab(false)}>
						Edit User Access
					</button>
				}
				<Selector isContentTab={isContentTab} />
			</TabHeader>

			{collection.content === undefined ?

				<Spinner/>
				:
				<>
					<Tab>
						{isContentTab ?
							content.map((item, index) => (
								<div key={index}>
									{ item !== undefined ? (
										<>
											{ isLabAssistant !== undefined ? (
												<ContentOverviewContainer key={item.id} content={item} isLabAssistant={isLabAssistant}/>
											) : (
												<ContentOverviewContainer key={item.id} content={item}/>
											)}
										</>
									) : null
									}
								</div>
							))
							: (
								<CollectionPermissionsContainer collection={collection} />
							)}
						{isContentTab && (
							<NewContent
								id='newcontent-button'
								className='std-outline-color'
								onClick={createContent}
								onMouseEnter={e => handleShowTip(`collection-add-content`,
									{
										x: e.target.getBoundingClientRect().x + 100,
										y: e.target.getBoundingClientRect().y + 180,
										width: e.currentTarget.offsetWidth,
									})
								}
								onMouseLeave={() => toggleTip()}>
								<Icon />
							</NewContent>
						)}
					</Tab>
				</>
			}
		</Style>
	)
}
export default ManageCollection
