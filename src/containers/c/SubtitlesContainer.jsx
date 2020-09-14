import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { subtitlesService } from 'services'

const SubtitlesContainer = props => {
	const {subtitles, currentTime, handleShowSubtitle, active,duration} = props

	const [subtitlesArray, setSubtitlesArray] = useState([])

	useEffect(() => {
		if(subtitles[active] !== undefined){
			const tempArray = subtitles[active][`content`]
			setSubtitlesArray([...tempArray])
		}else
			setSubtitlesArray([])

	}, [duration, subtitles])

	console.log(subtitles)

	subtitlesArray.forEach(element => {
		console.log(element)
		const start = element.start / 100 * duration
		const end = element.end / 100 * duration
		if(currentTime >= start && currentTime <= end){
			console.log(element.text)
			handleShowSubtitle(element.text)
		}else if (currentTime > end || currentTime < start)
			handleShowSubtitle(``)
	})

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
