import React, { useState, useEffect } from 'react'

import Style, {Button} from './styles'

const ConfirmationBox = props => {

	const {
		index,
		startOrEnd,
	} = props.viewstate

	const {
		toggleModal,
		handleInputChange,
		updateEvents,
	} = props.handlers


	return(
		<Style>
			<div>
				{startOrEnd == `start` ?
					<p>Change start time to current time?</p>
					:
					<p>Change end time to current time?</p>
				}
				{startOrEnd === `start` ?
					<Button className='content-cancel' onClick={(e, type) => handleInputChange(e, index, type, `start`)}>Yes</Button>
					:
					<Button className='content-cancel' onClick={(e, type) => handleInputChange(e, index, type, `end`)}>Yes</Button>
					}
					<Button className='content-delete' onClick={toggleModal}>No</Button>
			</div>
		</Style>
	)
}

export default ConfirmationBox