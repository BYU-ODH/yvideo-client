import React, { useRef } from 'react'
import { connect } from 'react-redux'

import getCaptionAider from 'lib/js/captionAider'
import { interfaceService } from 'services'

const CaptionAiderContainer = props => {
	const target = useRef()

	/* const renderModal = (component, props) => {
		props.toggleModal(component)
	}*/

	getCaptionAider(props.content, target[`current`])

	return (
		<div id='bottomContainer' ref={target}>
			<div id='timeline'></div>
		</div>
	)
}

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(null, mapDispatchToProps)(CaptionAiderContainer)
