import React from 'react'

import Style, { Button } from './styles'

const DeleteConfirm = props => {

	const {
		title,
		type,
	} = props.viewstate

	const {
		handleRemoveItem,
		toggleModal,
	} = props.handlers

	return (
		<>
			{
				<Style>
					<div className={`delete-div`}>
						<h2>Are you sure you want to delete {type}: <u>{title}</u>? It cannot be recovered</h2>
						<div className={`delete-buttons`}>
							<Button id='confirm-delete-cancel' className='url-content-cancel' type='button' onClick={toggleModal}>Cancel</Button>
							<Button id='confirm-delete' className='url-content-delete' type='submit' onClick={handleRemoveItem}>Delete</Button>
						</div>
					</div>
				</Style>

			}
		</>
	)
}

export default DeleteConfirm
