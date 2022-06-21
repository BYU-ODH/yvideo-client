import React from 'react'
import { connect } from 'react-redux'
import { interfaceService } from 'services'

import SubtitlesModal from 'components/modals/components/SubtitlesModal'

const SubtitlesModalContainer = props => {

	const {
		mode,
		deleteTitle,
		handleAddSubLayer,
		handleAddSubLayerFromFile,
		handleDeleteSubLayer,
		toggleModal,
		index,
		setIsReady,
	} = props

	const handleAddLayer = (array) => {
		handleAddSubLayer(array)
		toggleModal()
	}

	const handleAddLayerFromFile = (filePath) => {
		handleAddSubLayerFromFile(filePath)
		toggleModal()
	}

	const handleDeleteLayer = () => {
		handleDeleteSubLayer(index)
		toggleModal()
	}

	const viewstate = {
		mode,
		deleteTitle,
	}

	const handlers = {
		handleAddLayer,
		handleAddLayerFromFile,
		handleDeleteLayer,
		setIsReady,
		toggleModal,
	}

	return <SubtitlesModal viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	user: store.authStore.user,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesModalContainer)
