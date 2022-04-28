import React, { PureComponent } from 'react'
import Style, {
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
		} = this.props.handlers

		const {
			file,
			langs,
		} = this.props.viewstate

		return (
			<BoxRow>
				<InnerContainer>

					<Column className='file-column'>

						<div>
							<h4>Name:</h4> {file[`metadata`]}
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
					<EditButton className='edit-file-button' onClick={handleUpdateFile}><SaveIcon/>Update</EditButton>
					<RemoveButton className='remove-file-button' onClick={handleRemoveFile}><RemoveIcon/>Delete</RemoveButton>
				</div>
			</BoxRow>
		)
	}
}

export default FileOverview