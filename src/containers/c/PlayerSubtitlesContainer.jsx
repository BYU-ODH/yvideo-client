import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { subtitlesService } from 'services'
import { Events } from 'components'

const PlayerSubtitlesContainer = props => {

	const {
		subtitles,
		currentTime,
		handleShowSubtitle,
		active,
		duration,
		getSubtitles,
		indexToDisplay,
	} = props

	const [subtitlesArray, setSubtitlesArray] = useState([])

	const {id} = useParams()

	useEffect(() => {
		if(subtitles.length != 0){
			let temp = subtitles[indexToDisplay]
			let currentContent = temp.content

			try {
				if(typeof currentContent === "string"){
					temp.content = JSON.parse(subtitles[indexToDisplay].content)
				}

			}
			catch (e){
				console.log(e)
			}
			setSubtitlesArray(subtitles[indexToDisplay].content)
		}
	}, [duration, subtitles, indexToDisplay])

	for(let i = 0; i < subtitlesArray.length; i++){
		const element = subtitlesArray[i]
		const start = element.start
		const end = element.end

		if(currentTime >= start && currentTime <= end){
			props.handleShowSubtitle(element.text, i)
			break
		}
		else if (currentTime > end || currentTime < start)
			// console.log("overwriting ")
			props.handleShowSubtitle(``)
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