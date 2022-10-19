import React from 'react'

import Style from './styles'

const CaptionAider = props => {

	const {
		target,
	} = props.viewstate

	return (
		<Style>
			<div id='bottomContainer' ref={target} />
			<div id='timeline' />
		</Style>
	)
}

export default CaptionAider
