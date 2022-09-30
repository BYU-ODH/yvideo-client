import React, { PureComponent } from 'react'

import FileOverviewContainer from '../../../../containers/c/FileOverviewContainer'

import {
	Form,
	Button,
} from './styles'

export default class ManageFiles extends PureComponent {

	render() {

		const {
			files,
			filesUpdated,
		} = this.props.viewstate

		const {
			toggleModal,
			handleFilesUpdated,
		} = this.props.handlers

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
}
