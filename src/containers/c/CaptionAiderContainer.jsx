import React, { useEffect, useRef } from 'react'
import { Timeline } from 'subtitle-timeline-editor'
import ContentLoader from 'js/yvideojs/contentRendering/ContentLoader'

const CaptionAiderContainer = props => {
	const target = useRef()
	const timeline = new Timeline(target, {})



	return <div id='timeline' ref={target} />
}

export default CaptionAiderContainer
