import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { subtitlesService } from 'services'
// import { Events } from 'components'

const PlayerSubtitlesContainer = props => {

	const {
		subtitles,
		currentTime,
		duration,
		indexToDisplay,
		handleShowSubtitle,
	} = props

	const [subtitlesArray, setSubtitlesArray] = useState([])

	useEffect(() => {
		if(subtitles.length !== 0){
			const temp = subtitles[indexToDisplay]
			const currentContent = temp.content

			try {
				if(typeof currentContent === `string`)
					temp.content = JSON.parse(subtitles[indexToDisplay].content)

			} catch (e){
				return
			}
			handleSubtitlesArray()
		}
		for(let i = 0; i < subtitlesArray.length; i++){
			const element = subtitlesArray[i]
			const start = element.start
			const end = element.end

			if(currentTime >= start && currentTime <= end){
				handleShowSubtitle(element.text, i)
				break
			} else if (currentTime > end || currentTime < start)
				handleShowSubtitle(``)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duration, subtitles, indexToDisplay])

	const handleSubtitlesArray = () => {
		setSubtitlesArray(subtitles[indexToDisplay].content)
	}

	return <div></div>

}

const mapStateToProps = ({ subtitlesStore }) => ({
	subtitles: subtitlesStore.cache,
})

const mapDispatchToProps = {
	getSubtitles: subtitlesService.getSubtitles,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSubtitlesContainer)
