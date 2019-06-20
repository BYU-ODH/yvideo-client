import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { getContent } from 'redux/actions'

import Overview from './content/Overview'
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

	const { collection, getContent, content } = props

	const [isContent, setIsContent] = useState(true)

	useEffect(() => {
		getContent(collection)
	}, [collection, getContent])

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

	console.log(`editor render`, content)

	return (
		<Container>
			<header>
				<div>
					<h6>{collection.name}</h6>
				</div>
				<div>
					<PublishButton published={collection.published} onClick={togglePublish}>{collection.published ? `Unpublish` : `Publish`}</PublishButton>
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
						content.constructor === Object &&
						Object.entries(content).length !== 0 &&
						Object.keys(content).map((id, index) => <Overview key={index} collectionId={collection.id} data={content[id]} />)
						:
						<Permissions />
				}
				{isContent &&
					<NewContent onClick={createContent}><Icon src={plus} /></NewContent>
				}
			</Tab>
		</Container>
	)
}

const mapStateToProps = state => ({
	content: state.content
})

const mapDispatchToProps = {
	getContent
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)

