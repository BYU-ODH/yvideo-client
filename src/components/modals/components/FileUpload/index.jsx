import React, { PureComponent } from 'react'

import {
	Form,
	Upload,
	Button,
	CategorySelect,
	ProgressBar,
} from './styles'

export default class FileUpload extends PureComponent {

	render() {

		const {
			selectedFile,
			isOther,
			customLang,
			langs,
			progress,
		} = this.props.viewstate

		const {
			handleFileVersion,
			handleFileChange,
			handleFileUpload,
			// toggleModal,
			onKeyPress,
			handleOtherLanguage,
			// handleCancelUpload,
			handleProgressEvent,
		} = this.props.handlers

		return (
			// //onSubmit={handleFileUpload}
			<Form onKeyPress={onKeyPress} onSubmit={handleFileUpload} id='upload-file-form'>
				<h2>File Upload</h2>

				<label htmlFor='empty'>
				</label>

				<label htmlFor='create-resource-file-version'>
					<h4>File Version</h4>

					<CategorySelect id='categorySelect' onChange={handleFileVersion}>
						{langs.map( (lang, index) => (
							<option value={lang} key={index}>
								{lang}
							</option>
						))}
					</CategorySelect>
				</label>

				{isOther &&
					<label>
						<h4>Type Language</h4>
						<input id='type-language' type='text' name='customLang' value={customLang} onChange={handleOtherLanguage} />
					</label>
				}

				<label htmlFor='create-resource-file-version'>
					<h4>Select File</h4>
					<Upload>
						<div className='files'>
							<input type='file' className='files-input' onChange={handleFileChange}/>
						</div>
					</Upload>
				</label>

				{selectedFile && (
					<div className='progress'>
						{progress > 0 &&
							<>
								<ProgressBar value={progress} max={100} />
								<span><>{progress}%</></span>
							</>
						}
					</div>
				)}

				<label htmlFor='empty'>
				</label>

				<div>
					{/* toggleModal */}
					<Button type='button' >Cancel</Button>
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
