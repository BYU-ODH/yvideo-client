import React, { useState } from 'react'

import Content from './content/Content'
import Permissions from './permissions/Permissions'

import {
	Container,
	PublishButton,
	ArchiveButton,
	TabHeader,
	Selector,
	Tab,
	NewContent,
	Icon
} from './styles'

import plus from 'assets/collections/plus_gray.svg'

const Editor = props => {

	const { collection } = props
	const { content, published } = collection

	const [isContent, setIsContent] = useState(true)

	const togglePublish = e => {
		e.preventDefault()
		alert(`This isn't ready yet!`)
	}

	const createContent = e => {
		e.preventDefault()
		alert(`This isn't ready yet!`)
	}

	const archive = e => {
		e.preventDefault()
		alert(`This isn't ready yet!`)
	}

	return (
		<Container>
			<header>
				<div>
					<h6>{collection.name}</h6>
				</div>
				<div>
					<PublishButton published={published} onClick={togglePublish}>{published ? `Unpublish` : `Publish`}</PublishButton>
					<ArchiveButton onClick={archive}>Archive</ArchiveButton>
				</div>
			</header>
			<TabHeader>
				<button onClick={() => setIsContent(true)}>Content</button>
				<button onClick={() => setIsContent(false)}>Permissions</button>
				<Selector isContent={isContent} />
			</TabHeader>
			<Tab>
				{
					isContent ?
					content.map((item, index) => <Content key={index} video={item} />)
					:
					<Permissions />
				}
				{ isContent &&
					<NewContent onClick={createContent}><Icon src={plus} /></NewContent>
				}
			</Tab>
		</Container>
	)
}

export default Editor
