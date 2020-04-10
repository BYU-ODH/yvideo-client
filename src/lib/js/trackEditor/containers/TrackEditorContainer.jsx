import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { TrackEditor } from 'lib/js/trackEditor/components'

const TrackEditorContainer = () => {

	const params = useParams()

	const [playing, setPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [totalTime, setTotalTime] = useState(0)
	// React Video Player ref (Child)
	const [playerRef, setPlayerRef]= useState(null)

	const viewstate = {
		contentId: params.id,
		playing,
		currentTime,
		totalTime,
	}

	const handlers = {
		togglePlay(playBool) {
			setPlaying(playBool)
			// alert(`hello`)
		},
		handleVideoScrubChange(value) {
			console.log(value)
			// const adjustedTime = totalTime * (value / 100)
			// const adjustedTime = totalTime * (value / 100)
			setCurrentTime(value)
			// console.log(`Ref: `, playerRef)
			playerRef.seekTo(value, {type: `seconds`})

			// console.log(`Adjusted time: `, adjustedTime)
		},

		handleTotalTimeChange(value) {
			setTotalTime(value)
		},
		handleCurrentTimeChange(value) {
			console.log(`handleCurrentTimeChange: `, value)
			console.log(`handleCurrentTimeChange (totalTime): `, totalTime)
			setCurrentTime(value)
		},
		handleSetPlayerRef(ref) {
			setPlayerRef(ref)
		},
	}

	return <TrackEditor viewstate={viewstate} handlers={handlers}/>
}

export default TrackEditorContainer