import React from 'react'

import Style, { Button } from './styles'

const ContentDelete = props => {

	const { deleteContentItem } = props.viewstate

	const {
		toggleModal,
		handleDeleteContent,
	} = props.handlers

	return (
		<Style>
			<div className={`delete-div`}>
				<h2>Are you sure you want to delete content item: <u>{deleteContentItem}</u>?</h2>
				<div className={`delete-buttons`}>
					<Button className='content-cancel' type='button' onClick={toggleModal}>Cancel</Button>
					<Button className='content-delete' type='submit' onClick={handleDeleteContent}>Delete</Button>
				</div>
			</div>
		</Style>
	)
}

export default ContentDelete
