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
		} = this.props.viewstate

		const {
			unarchive,
			toggleEdit,
			handleNameChange,
			togglePublish,
			archive,
			setTab,
			createContent,
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
						>
							{isEditingCollectionName ? `Save` : `Edit`}
						</TitleEditButton>
					</Title>
					<div>
						{collection.archived ? (
							<>
								{ admin !== undefined ? (
									<>{admin === 0 || admin === 1 ? (
										<ArchiveButton onClick={unarchive}>Unarchive</ArchiveButton>
									) : ( <p>Cannot unarchive</p> )}
									</>
								) : null }
							</>
						) : (
							<>
								<PublishButton
									published={collection.published}
									onClick={togglePublish}
								>
									{collection.published ? `Unpublish` : `Publish`}
								</PublishButton>
								<ArchiveButton onClick={archive}>Archive</ArchiveButton>
							</>
						)}
					</div>
				</header>
				<TabHeader>
					<button className={`content-button`} onClick={setTab(true)}>Content</button>
					<button className={`permissions-button`} onClick={setTab(false)}>Permissions</button>
					<Selector isContent={isContent} />
				</TabHeader>
				<Tab>
					{isContent ?
						content.map(item => (
							<ContentOverviewContainer key={item.id} content={item} />
						))
						: (
							<CollectionPermissionsContainer collection={collection} />
						)}

					{isContent && (
						<NewContent className={`newcontent-button`} onClick={createContent}>
							<Icon src={plus} />
						</NewContent>
					)}
				</Tab>
			</Style>
		)
	}
}
