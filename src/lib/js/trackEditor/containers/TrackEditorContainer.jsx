import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { TrackEditor } from 'lib/js/trackEditor/components'

const TrackEditorContainer = () => {

	const params = useParams()

	const [playing, setPlaying] = useState(false)
	const [time, setTime] = useState(12.55)

	const viewstate = {
		contentId: params.id,
		playing,
		time,
	}

	const handlers = {
		togglePlay() {
			setPlaying(!playing)
			// alert(`hello`)
		},
	}

	return <TrackEditor viewstate={viewstate} handlers={handlers}/>
}

export default TrackEditorContainer