import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	interfaceService,
} from 'services'

import Translation from '../components/Translation'

const TranslationContainer = props => {

	const {
		toggleModal,
		words,
		meanings,
	} = props

	const handlers = {
		toggleModal,
	}

	const viewstate = {
		words,
		meanings,
	}

	return <Translation viewstate={viewstate} handlers={handlers}/>
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(TranslationContainer)