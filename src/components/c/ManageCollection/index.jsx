import React, { PureComponent } from 'react'

import {
	ContentOverviewContainer,
	CollectionPermissionsContainer,
} from 'containers'

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
	SaveIcon,
	Publish,
	Spinner,
} from './styles'

export default class ManageCollection extends PureComponent {
	render() {
		const {
			user,
			collection,
			collectionName,
			isEditingCollectionName,
			isContentTab,
			content,
			isLabAssistant,
		} = this.props.viewstate

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
		} = this.props.handlers

		content.sort((a, b) => {
			return a.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) > b.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) ? 1 : -1
		})
		return (
			<Style>
				<header>
					<Title>
						{isEditingCollectionName ? (
							// TODO When switching between collections, it uses the same value
							<TitleEdit
								type='text'
								id={`title-edit`}
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
							<h6 onClick={e => toggleEdit(e)}>{collectionName}</h6>
						)}
						<TitleEditButton
							id={`title-edit-button`}
							editing={isEditingCollectionName}
							onClick={toggleEdit}
							onMouseEnter={e => handleShowTip(`collection-edit-name`,
								{
									x: e.target.getBoundingClientRect().x,
									y: e.target.getBoundingClientRect().y,
									width: e.currentTarget.offsetWidth
								})
							}
							onMouseLeave={e => toggleTip()}
						>
							{isEditingCollectionName ? <><SaveIcon/>Save</> : `Edit`}
						</TitleEditButton>
					</Title>
					<Publish>
						{collection.archived ? (
							<>
								{ user.roles !== undefined ? (
									<>{user.roles === 0 || user.roles === 1 ? (
										<ArchiveButton id={`archive-button`} className={`std-outline-color`} onClick={unarchive}>Unarchive</ArchiveButton>
									) : ( <p>Cannot unarchive</p> )}
									</>
								) : null }
							</>
						) : (
							<>
								{ !collection.public ? (
									<PublishButton
										published={collection.published}
										onClick={togglePublish}
										id={`publish-button`}
										className={`std-outline-color`}
										onMouseEnter={e => handleShowTip(`collection-publish`,
											{
												x: e.target.getBoundingClientRect().x,
												y: e.target.getBoundingClientRect().y + 15,
												width: e.currentTarget.offsetWidth
											})
										}
										onMouseLeave={e => toggleTip()}
									>
										{collection.published ? `Unpublish` : `Publish`}
									</PublishButton>
								): (<></>)}
								<ArchiveButton id={`archive-button`} className={`std-outline-color`} onClick={archive}>Archive</ArchiveButton>
							</>
						)}
					</Publish>
				</header>
				<TabHeader>
					<button id={`content-button`} className={`std-outline-color`} onClick={setTab(true)}>Content</button>
					<button id={`permissions-button`} className={`std-outline-color`} onClick={setTab(false)}
						onMouseEnter={e => handleShowTip(`collection-permissions`,
							{
								x: e.target.getBoundingClientRect().x,
								y: e.target.getBoundingClientRect().y + 5,
								width: e.currentTarget.offsetWidth
							})
						}
						onMouseLeave={e => toggleTip()}
					>Edit User Access</button>
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
							{isContentTab && collection[`expired-content`] ?
								collection[`expired-content`].map((item, index) => (
									<ContentOverviewContainer key={index} content={item} isExpired={true}/>
								))
								:
								null
							}
							{isContentTab && (
								<NewContent
									id='newcontent-button'
									className='std-outline-color'
									onClick={createContent}
									onMouseEnter={e => handleShowTip(`collection-add-content`,
										{
											x: e.target.getBoundingClientRect().x + 5,
											y: e.target.getBoundingClientRect().y + 55,
											width: e.currentTarget.offsetWidth
										})
									}
									onMouseLeave={e => toggleTip()}>
									<Icon />
								</NewContent>
							)}
						</Tab>
					</>

				}
			</Style>
		)
	}
}
