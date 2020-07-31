import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	TypeButton,
	Tab,
} from './styles'

export default class FileUpload extends PureComponent {

	render() {

		const {
			toggleModal,
		} = this.props.handlers

		return (
			<>
				<h2>File Upload</h2>
				<Tab/>
				<div>
					<Button type='button' onClick={toggleModal}>Cancel</Button>
					<Button type='submit' color={`#0582CA`}>Upload</Button>
				</div>
			</>
		)
	}
}
