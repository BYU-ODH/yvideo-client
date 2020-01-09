import React, { PureComponent } from 'react'

import {
	ContentOverviewContainer,
	CollectionPermissionsContainer,
} from 'containers'

import Style, {
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
			collection,
			isContent,
			content,
		} = this.props.viewstate

		const {
			togglePublish,
			archive,
			setTab,
			createContent,
		} = this.props.handlers

		return (
			<Style>
				<header>
					<div className='title'>
						<h6>{collection.name}</h6>
					</div>
					<div>
						{collection.archived ?
							<p>(archived)</p>
							:
							<>
								<PublishButton published={collection.published} onClick={togglePublish}>{collection.published ? `Unpublish` : `Publish`}</PublishButton>
								<ArchiveButton onClick={archive}>Archive</ArchiveButton>
							</>
						}
					</div>
				</header>
				<TabHeader>
					<button onClick={setTab(true)}>Content</button>
					<button onClick={setTab(false)}>Permissions</button>
					<Selector isContent={isContent} />
				</TabHeader>
				<Tab>
					{isContent ?
						content.map(item => <ContentOverviewContainer key={item.id} content={item} />)
						:
						<CollectionPermissionsContainer collection={collection} />
					}

					{isContent &&
						<NewContent onClick={createContent} ><Icon src={plus} /></NewContent>
					}
				</Tab>
			</Style>
		)

	}
}