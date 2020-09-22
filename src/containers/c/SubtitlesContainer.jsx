import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { subtitlesService } from 'services'
import { Events } from 'components'

const SubtitlesContainer = props => {
	const {subtitles, currentTime, handleShowSubtitle, active,duration} = props

	const [subtitlesArray, setSubtitlesArray] = useState([])

	useEffect(() => {
		handleShowSubtitle(``)
		if(subtitles[active] !== undefined){
			const tempArray = subtitles[active][`content`]
			setSubtitlesArray([...tempArray])
			console.log(`yike`,tempArray)

		}else
			setSubtitlesArray([])
	}, [duration, subtitles])

	// console.log(subtitlesArray)
	for(let i = 0; i<subtitlesArray.length; i++){
		const element = subtitlesArray[i]
		console.log(element)
		const start = element.start / 100 * duration
		const end = element.end / 100 * duration
		if(currentTime >= start && currentTime <= end){
			handleShowSubtitle(element.text)
			break
		}else if (currentTime > end || currentTime < start)
			handleShowSubtitle(``)
	}

	// console.log('%c Event Container', 'color: orange; font-weight: bolder; font-size: 12px;')
	const eventClassArray = subtitles
	const viewstate = {
		currentTime,
		eventClassArray,
	}
	return <Events viewstate={viewstate}></Events>

}

const mapStateToProps = ({ subtitlesStore }) => ({
	subtitles: subtitlesStore.cache,
	active: subtitlesStore.active,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesContainer)
