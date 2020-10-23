import React, { PureComponent } from 'react'

import {
	Form,
	Upload,
	Button,
	CategorySelect,
} from './styles'

export default class FileUpload extends PureComponent {

	render() {

		const {
			selectedFile,
			isOther,
			customLang,
			langs,
		} = this.props.viewstate

		const {
			handleFileVersion,
			handleFileChange,
			handleFileUpload,
			toggleModal,
			onKeyPress,
			handleOtherLanguage,
		} = this.props.handlers

		return (
			<Form onKeyPress={onKeyPress} onSubmit={handleFileUpload} id='upload-file-form'>
				<h2>File Upload</h2>

				<label htmlFor='empty'>
				</label>

				<label htmlFor='create-resource-file-version'>
					<h4>Select File</h4>
					<Upload>
						<div className='files'>
							<input type='file' className='files-input' onChange={handleFileChange}/>
						</div>
					</Upload>
				</label>

				<label htmlFor='create-resource-file-version'>
					<h4>File Version</h4>

					<CategorySelect id='categorySelect' onChange={handleFileVersion}>
						{langs.map( (lang, index) => (
							<option value={lang} key={index}>
								{lang}
							</option>
						))}
						{/* {Object.keys(category).map((c, index) => (
							<option value={category[c].name} key={index}>
								{category[c].name}
							</option>
						))} */}
					</CategorySelect>
				</label>

				{isOther &&
					<label>
						<h4>Type Language</h4>
						<input id='type-language' type='text' name='customLang' value={customLang} onChange={handleOtherLanguage} />
					</label>
				}

				<label htmlFor='empty'>
				</label>

				{/* TODO: These can be used for later for an extra data */}
				{/* <label htmlFor='create-resource-file-metadata'>
					<h4>Metadata</h4>
					<textarea onChange={handleFileMetadata} rows={2}/>
				</label>

				<label htmlFor='create-resource-file-mime'>
					<h4>Mime</h4>
					<textarea onChange={handleFileMime} rows={2}/>
				</label> */}

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
