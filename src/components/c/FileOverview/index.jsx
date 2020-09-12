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
			category,
		} = this.props.viewstate

		return (
			<BoxRow>
				<InnerContainer>
					<Column>
						<div>
							<h4>File Name:</h4> {file[`filepath`]}
						</div>

						<div>
							<h4>File version:</h4>
							{console.log(file)}
							<CategorySelect defaultValue={file[`file-version`]} id='categorySelect' onChange={handleFileVersion}>
								{langs !== undefined && langs.map( (lang, index) => (
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
						</div>

						{/* <div>
							<h4>File ID:</h4> {file[`id`]}
						</div>

						<div>
							<h4>Resource ID:</h4> {file[`resource-id`]}
						</div> */}

						{/* <div>
							<h4>Mime:</h4> {file[`mime`]}
						</div> */}
					</Column>

					{/* <Column>
						<h4>Metadata</h4>
						<textarea onChange={handleFileMetadata} defaultValue={file.metadata} rows={8}/>
					</Column> */}
				</InnerContainer>
				<div>
					<EditButton onClick={handleUpdateFile}>Update<SaveIcon/></EditButton>
					<RemoveButton className='remove-file-button' onClick={handleRemoveFile}>Delete<RemoveIcon/></RemoveButton>
				</div>
			</BoxRow>
		)
	}
}

export default FileOverview