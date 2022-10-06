import React from 'react'

import FileOverviewContainer from '../../../../containers/c/FileOverviewContainer'

import {
	Form,
	Button,
} from './styles'

const ManageFiles = props => {

	const {
		files,
		filesUpdated,
	} = props.viewstate

	const {
		toggleModal,
		handleFilesUpdated,
	} = props.handlers

	return (
		<>
			<Form>
				<div>
					<h2>Manage Files</h2>
					<Button id='manage-files-cancel' type='button' onClick={toggleModal}>{filesUpdated ? `Done` : `Cancel`}</Button>
				</div>

				{Object.keys(files).map(index => <FileOverviewContainer key={files[index].id} file={files[index]} handleFilesUpdated={handleFilesUpdated} />)}
			</Form>
		</>
	)
}

export default ManageFiles
