import React, { PureComponent } from 'react'

import {
	Form,
	Upload,
	UploadButton,
	Button,
	TypeButton,
	Tab,
} from './styles'

export default class FileUpload extends PureComponent {

	render() {

		const {
			selectedFile,
		} = this.props.viewstate

		const {
			handleFileChange,
			handleFileUpload,
			toggleModal,
			onKeyPress,
		} = this.props.handlers

		return (
			<Form onKeyPress={onKeyPress} onSubmit={handleFileUpload} id='upload-file-form'>
				<h2>File Upload</h2>
				<Upload>
					<div className='files'>
						<input type='file' className='files-input' onChange={handleFileChange}/>
					</div>
				</Upload>

				<div>
					<Button type='button' onClick={toggleModal}>Cancel</Button>
					{selectedFile !== undefined ?
						<Button type='submit' color={`#0582CA`}>Upload</Button>
						:
						<Button disabled={selectedFile === undefined} type='submit' color={`#A0A0A0`}>Upload</Button>
					}
				</div>
			</Form>
		)
	}
}
