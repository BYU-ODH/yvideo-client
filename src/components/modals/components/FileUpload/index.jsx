import React, { PureComponent } from 'react'

import {
	Form,
	Upload,
	Button,
	CategorySelect,
	ProgressBar,
	Progress,
} from './styles'

export default class FileUpload extends PureComponent {

	// TODO: need to consider the case that when user wants to cancel while uploading file (such as selecting a wrong file or it takes too long to upload, etc.).
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
			toggleModal,
			onKeyPress,
			handleOtherLanguage,
		} = this.props.handlers

		return (
			<Form onKeyPress={onKeyPress} onSubmit={handleFileUpload} id='upload-file-form'>
				<h2>File Upload</h2>

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

				{selectedFile ? (
					<>
						{progress > 0 ? (
							<label htmlFor='file-upload-progress'>
								<Progress>
									<h4>Progress</h4>
									<ProgressBar value={progress} max={100} />
									<span><>{progress}%</></span>
								</Progress>
							</label>
						):(
							<label htmlFor='empty'>
								<div></div>
							</label>
						)
						}
					</>
				) : (
					<label htmlFor='empty'>
						<div></div>
					</label>
				)
				}

				<div>
					<Button type='button' onClick={toggleModal}>Cancel</Button>
					{selectedFile !== undefined ?
						<>
							{progress === 0 ? (
								<Button type='submit' color={`#0582CA`}>Upload</Button>
							):(
								<Button disabled type='submit' color={`#A0A0A0`}>Uploading...</Button>
							)
							}
						</>
						:
						<Button disabled={selectedFile === undefined} type='submit' color={`#A0A0A0`}>Upload</Button>
					}
				</div>
			</Form>
		)
	}
}
