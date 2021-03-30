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
} from './styles'

import plus from 'assets/plus_gray.svg'

export default class ManageCollection extends PureComponent {
	render() {
		const {
			admin,
			collection,
			collectionName,
			isEditingCollectionName,
			isContent,
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

		return (
			<Style>
				<header>
					<Title>
						{isEditingCollectionName ? (
							// TODO When switching between collections, it uses the same value
							<TitleEdit
								type='text'
								value={collectionName}
								contenteditable='true'
								onChange={handleNameChange}
								className={`title-edit`}
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
							editing={isEditingCollectionName}
							onClick={toggleEdit}
							className={`title-edit-button`}
							onMouseEnter={e => handleShowTip(`collection-edit-name`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
							onMouseLeave={e => toggleTip()}
						>
							{isEditingCollectionName ? `Save` : `Edit`}
						</TitleEditButton>
					</Title>
					<div>
						{collection.archived ? (
							<>
								{ admin !== undefined ? (
									<>{admin === 0 || admin === 1 ? (
										<ArchiveButton className={`archive-button`} onClick={unarchive}>Unarchive</ArchiveButton>
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
										className={`publish-button`}
										onMouseEnter={e => handleShowTip(`collection-publish`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 15, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}
									>
										{collection.published ? `Unpublish` : `Publish`}
									</PublishButton>
								): (<></>)}
								<ArchiveButton className={`archive-button`} onClick={archive}>Archive</ArchiveButton>
							</>
						)}
					</div>
				</header>
				<TabHeader>
					<button className={`content-button`} onClick={setTab(true)}>Content</button>
					<button className={`permissions-button`} onClick={setTab(false)}
						onMouseEnter={e => handleShowTip(`collection-permissions`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
						onMouseLeave={e => toggleTip()}
					>Permissions</button>
					<Selector isContent={isContent} />
				</TabHeader>
				<Tab>
					{isContent ?
						content.map((item, index) => (
							<div key={index}>
								{ isLabAssistant !== undefined ? (
									<ContentOverviewContainer key={item.id} content={item} isLabAssistant={isLabAssistant} isExpired={collection['expired-content'].findIndex((item) => item['content-id'] === content.id)}/>
								) : (
									<ContentOverviewContainer key={item.id} content={item} isExpired={collection['expired-content'].findIndex((item) => item['content-id'] === content.id)}/>
								)}
							</div>
						))
						: (
							<CollectionPermissionsContainer collection={collection} />
						)}

					{isContent && (
						<NewContent className={`newcontent-button`} onClick={createContent}>
							<Icon src={plus}
								onMouseEnter={e => handleShowTip(`collection-add-content`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
								onMouseLeave={e => toggleTip()}
							/>
						</NewContent>
					)}
				</Tab>
			</Style>
		)
	}
}
