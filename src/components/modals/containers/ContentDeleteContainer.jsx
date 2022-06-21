import React from 'react'
import { connect } from 'react-redux'
import { interfaceService } from 'services'

import ContentDelete from '../components/ContentDelete'

const ContentDeleteContainer = props => {

	const {
		toggleModal,
		content,
		removeCollectionContent,
		isLabAssistant,
		adminRemoveCollectionContent,
	} = props

	const deleteContentItem = content.name

	const handleDeleteContent = () => {
		if(isLabAssistant)
			adminRemoveCollectionContent(content.id)
		else
			removeCollectionContent(content.collectionId, content.id)

		toggleModal()
	}

	const viewstate = {deleteContentItem}

	const handlers = {handleDeleteContent, toggleModal}

	return <ContentDelete viewstate={viewstate}	handlers={handlers}/>
}

const mapStateToProps = store => ({
	user: store.authStore.user,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentDeleteContainer)
