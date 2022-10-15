import React from 'react'

const CloseButton = props => {

	const {
		handleClosePreview,
	} = props

	return(
		<CloseButton onClick={handleClosePreview}/>
	)
}

export default CloseButton