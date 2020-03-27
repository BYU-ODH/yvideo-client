import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { TrackEditor } from 'lib/js/trackEditor/components'

const TrackEditorContainer = () => {

	const params = useParams()

	const [playing, setPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(3.55)
	const [totalTime, setTotalTime] = useState(12.55)

	const viewstate = {
		contentId: params.id,
		playing,
		currentTime,
		totalTime,
	}

	const handlers = {
		togglePlay() {
			setPlaying(!playing)
			// alert(`hello`)
		},
		handleVideoScrubChange(value) {
			console.log(value)
			const adjustedTime = totalTime * (value / 100)
			setCurrentTime(adjustedTime)
			console.log(`Adjusted time: `, adjustedTime)
		},
	}

	return <TrackEditor viewstate={viewstate} handlers={handlers}/>
}

export default TrackEditorContainer