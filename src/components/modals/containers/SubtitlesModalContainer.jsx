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
	} = props

	const handleAddLayer = () => {
		handleAddSubLayer()
		toggleModal()
	}

	const handleAddLayerFromFile = () => {
		handleAddSubLayerFromFile()
		toggleModal()
	}

	const handleDeleteLayer = () => {
		handleDeleteSubLayer(index)
		toggleModal()
	}


	const viewstate = { mode, deleteTitle}

	const handlers = {
		handleAddLayer,
		handleAddLayerFromFile,
		handleDeleteLayer,
		toggleModal,
	}


return <SubtitlesModal viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	user: store.authStore.user
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesModalContainer)