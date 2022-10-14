import React from 'react'

import Style, { Button } from './styles'

const DialogBox = props => {

	const {confirmNavigation, cancelNavigation, toggleModal} = props

	const cancel = () => {
		toggleModal()
		cancelNavigation()
	}

	const confirm = () => {
		toggleModal()
		confirmNavigation()
	}

	return (
		<Style>
			<div className={`delete-div`}>
				<h1>Warning</h1>
				<hr></hr><br></br>
				<h2>There are unsaved changes. Are you sure you want to continue?</h2>
				<div className={`delete-buttons`}>
					<Button className='content-cancel' type='button' onClick={cancel}>Go Back</Button>
					<Button className='content-delete' type='submit' onClick={confirm}>Continue Without Saving</Button>
				</div>
			</div>
		</Style>
	)
}

export default DialogBox
