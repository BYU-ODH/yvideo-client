import React, { PureComponent } from 'react'
import { TitleEdit } from '../ResourceOverview/styles'
import {
	InnerContainer,
	Column,
	BoxRow,
	RemoveButton,
	RemoveIcon,
	EditButton,
	SaveIcon,
	CategorySelect,
	FileTitle,
} from './styles'

export class FileOverview extends PureComponent {

	render() {

		const {
			handleUpdateFile,
			handleFileMetadata,
			handleRemoveFile,
			handleFileVersion,
			// toggleEdit,
		} = this.props.handlers

		const {
			file,
			langs,
			fileState,
		} = this.props.viewstate

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
							<CategorySelect className='file-change-lang' defaultValue={file[`file-version`]} id='categorySelect' onChange={handleFileVersion}>
								{langs !== undefined && langs.map( (lang, index) => (
									<option value={lang} key={index}>
										{lang}
									</option>
								))}
							</CategorySelect>
						</div>
					</Column>
				</InnerContainer>
				<div>
					<EditButton id='edit-file-button' onClick={handleUpdateFile}><SaveIcon/>Update</EditButton>
					<RemoveButton id='remove-file-button' onClick={handleRemoveFile}><RemoveIcon/>Delete</RemoveButton>
				</div>
			</BoxRow>
		)
	}
}

export default FileOverview
