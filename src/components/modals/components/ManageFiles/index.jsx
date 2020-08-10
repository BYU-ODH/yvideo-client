import React, { PureComponent } from 'react'

import FileOverviewContainer from '../../../../containers/c/FileOverviewContainer'

import {
	Form,
	Button,
} from './styles'

export default class ManageFiles extends PureComponent {

	render() {

		const {
			toggleModal,
		} = this.props.handlers

		const {
			files,
		} = this.props.viewstate

		return (
			<>
				<Form>
					<h2>Manage Files</h2>

					{Object.keys(files).map(index => <FileOverviewContainer key={files[index].id} file={files[index]} />)}
					<div>
						<Button type='button' onClick={toggleModal}>Cancel</Button>
						<Button type='submit' color={`#0582CA`}>Update</Button>
					</div>
				</Form>
			</>
		)
	}
}
