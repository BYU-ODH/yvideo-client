import React from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
} from 'services'

import ErrorModal from 'components/modals/components/ErrorModal'

const ErrorModalContainer = props => {

	const {
		toggleModal,
		errorMessage,
	} = props

	const viewstate = {
		errorMessage,
	}

	const handlers = {
		toggleModal,
	}

	return <ErrorModal viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
	modal: store.interfaceStore.modal,
	user: store.authStore.user,
	errorMessage: store.contentStore.errorMessage,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModalContainer)