import React from 'react'
import { TitleEdit } from '../ResourceOverview/styles'
import {
	InnerContainer,
	Column,
	BoxRow,
	RemoveButton,
	RemoveIcon,
	PreviewButton,
	EditButton,
	SaveIcon,
	CategorySelect,
	FileTitle,
	PreviewIcon,
} from './styles'

const FileOverview = props => {

	const {
		handleFileMetadata,
		handleFileVersion,
		handleUpdateFile,
		handleRemoveFile,
		handlePreviewFile,
	} = props.handlers

	const {
		file,
		langs,
		fileState,
	} = props.viewstate

	return (
		<BoxRow>
			<InnerContainer>

				<Column id='file-column'>
					<div>
						<h4>Name:</h4>
						<FileTitle>
							<TitleEdit
								type='text'
								id='title-edit'
								data-testid='title-edit'
								value={fileState[`metadata`]}
								contenteditable='true'
								onChange={handleFileMetadata}
							>
							</TitleEdit>
						</FileTitle>
					</div>

					<div>
						<h4>Path:</h4> {file[`filepath`]}
					</div>

					<div>
						<h4>version:</h4>
						<CategorySelect
							className='file-change-lang'
							defaultValue={file[`file-version`]}
							id='categorySelect'
							data-testid='version-edit'
							onChange={handleFileVersion}>
							{langs?.map((lang, index) => (
								<option data-testid='select-option' value={lang} key={index}>
									{lang}
								</option>
							))}
						</CategorySelect>
					</div>
				</Column>
			</InnerContainer>
			<div>
				<EditButton id='edit-file-button' onClick={handleUpdateFile}><SaveIcon/>Update</EditButton>
				<PreviewButton id='preview-file-button' onClick={handlePreviewFile}><PreviewIcon/>Preview</PreviewButton>
				<RemoveButton id='remove-file-button' data-testid='remove-file-button' onClick={handleRemoveFile}><RemoveIcon/>Delete</RemoveButton>
			</div>
		</BoxRow>
	)
}

export default FileOverview
