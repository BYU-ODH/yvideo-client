import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { subtitlesService } from 'services'

const SubtitlesContainer = props => {
	const {subtitles, currentTime, handleShowSubtitle, active,duration} = props
	console.log(subtitles)

	if(subtitles[active] !== undefined){
		console.log(`ack`,subtitles[active])
		subtitles[active][`content`].forEach(element => {
			console.log(element)
			const start = element.start / 100 * duration
			const end = element.end / 100 * duration
			if(currentTime >= start && currentTime <= end){
				console.log(element.text)
				handleShowSubtitle(element.text)
			}else if (currentTime > end || currentTime < start)
				handleShowSubtitle(``)
		})
	}

	// console.log('%c Event Container', 'color: orange; font-weight: bolder; font-size: 12px;')

	return <div></div>
}

const mapStateToProps = ({ subtitlesStore }) => ({
	subtitles: subtitlesStore.cache,
	active: subtitlesStore.active,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesContainer)
