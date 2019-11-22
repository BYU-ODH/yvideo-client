import React, { useRef } from 'react'
import { connect } from 'react-redux'

import getCaptionAider from 'lib/js/captionAider'
import { interfaceService } from 'src/services'

const CaptionAiderContainer = props => {
	const target = useRef()

	const renderModal = (component, props) => {
		props.toggleModal(component)
	}

	getCaptionAider(props.content, target, renderModal)

	return <div id='timeline' ref={target} />
}

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(null, mapDispatchToProps)(CaptionAiderContainer)
