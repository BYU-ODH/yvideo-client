import React from 'react'
import { useParams } from 'react-router-dom'

import { TrackEditor } from 'lib/js/trackEditor/components'

const TrackEditorContainer = () => {

	const params = useParams()

	const viewstate = {
		contentId: params.id,
	}

	return <TrackEditor viewstate={viewstate}/>
}

export default TrackEditorContainer