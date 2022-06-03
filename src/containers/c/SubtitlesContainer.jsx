import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Events } from 'components'

const SubtitlesContainer = props => {

	const {subtitles, currentTime, handleShowSubtitle, active,duration} = props

	const [subtitlesArray, setSubtitlesArray] = useState([])

	useEffect(() => {
		handleShowSubtitle(``)
		if(subtitles[active] !== undefined){
			const tempArray = subtitles[active][`content`]
			setSubtitlesArray([...tempArray])

		}else
			setSubtitlesArray([])
		for(let i = 0; i<subtitlesArray.length; i++){
			const element = subtitlesArray[i]
			const start = element.start
			const end = element.end
			if(currentTime >= start && currentTime <= end){
				handleShowSubtitle(element.text)
				break
			}else if (currentTime > end || currentTime < start)
				handleShowSubtitle(``)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duration, subtitles])

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
