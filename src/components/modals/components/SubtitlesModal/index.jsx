import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
	contentService,
	collectionService,
	interfaceService,
	adminService,
	resourceService,
	languageService,
} from 'services'

import SubtitleModal from 'src/components/modals/components/SubtitlesModal'

const SubtitleModalContainer = props => {

	const {
		toggleModal,
	} = props
}