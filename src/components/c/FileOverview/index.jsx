import React, { PureComponent } from 'react'
import Style, {
	InnerContainer,
	Column,
	BoxRow,
	RemoveButton,
	RemoveIcon,
	FileTitle,
} from './styles'

export class FileOverview extends PureComponent {

	render() {

		const {
			handleFileMetadata,
			handleRemoveFile,
		} = this.props.handlers

		const {
			file,
		} = this.props.viewstate

		return (
			<BoxRow>
				<InnerContainer>
					<Column>
						<div>
							<h4>Title:</h4> {file[`filepath`]}
						</div>

						<div>
							<h4>file version:</h4> {file[`file-version`]}
						</div>

						<div>
							<h4>id:</h4> {file[`id`]}
						</div>

						<div>
							<h4>mime:</h4> {file[`mime`]}
						</div>

						<div>
							<h4>resource id:</h4> {file[`resource id`]}
						</div>
					</Column>

					<Column>
						<h4>Metadata</h4>
						<textarea onChange={handleFileMetadata} defaultValue={file.metadata} rows={8}/>
					</Column>
				</InnerContainer>
				<RemoveButton className='remove-file-button' onClick={handleRemoveFile}>Delete<RemoveIcon/></RemoveButton>
			</BoxRow>
		)
	}
}

export default FileOverview