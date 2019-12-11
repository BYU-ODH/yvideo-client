import React, { useRef } from 'react'
import { connect } from 'react-redux'

import getCaptionAider from 'lib/js/captionAider'
import { interfaceService } from 'services'

const CaptionAiderContainer = props => {
	const target = useRef()

	const renderModal = (component, props) => {
		props.toggleModal(component)
	}

	console.log(props.content)

	getCaptionAider(props.content, target, renderModal)

	return (
		<div id='bottomContainer' ref={target}>
			Hello
			<div id='timeline'></div>
		</div>
	)
}

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(null, mapDispatchToProps)(CaptionAiderContainer)
