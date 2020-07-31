import React, { PureComponent } from 'react'
import Style, {
	InnerContainer,
	Column,
	Preview,
	Buttons,
	EditButton,
	RemoveButton,
	Title,
	TitleEdit,
	RemoveIcon,
	SaveIcon,
	TypeButton,
	Type,
	BoxRow,
	ResourceTitle,
} from './styles'
import { SwitchToggle } from 'components/bits'

export class ResourceOverview extends PureComponent {

	render() {

		const {
			handleResourceName,
			handleResourceMetadata,
			handleToggleEdit,
			handleRemoveResource,
			handleTogglePhysicalCopyExists,
			handleTogglePublish,
			handleToggleCopyRighted,
			handleToggleFullVideo,
			handleTypeChange,
			handleResourceEmail,
			handleFileUploadToResource,
		} = this.props.handlers

		const {
			resource,
			showing,
			editing,
		} = this.props.viewstate

		const {
			metadata,
			resourceName,
			physicalCopyExists,
			published,
			copyrighted,
			resourceType,
			fullVideo,
			requesterEmail,
		} = resource

		return (
			<BoxRow>
				<Style>
					<Preview>
						<div>
							{editing ?
								<ResourceTitle><h4>Title:</h4><TitleEdit type='text' value={resourceName} onChange={handleResourceName}/></ResourceTitle>
								:
								<h4>{resourceName}</h4>
							}
						</div>
						<Buttons>
							{editing &&
							<>
								{/* TODO: need to figure out how it work on attaching files on resource */}
								{/* <FileUploadButton className='file-attach-button' onClick={handleFileUploadToResource}>Attach File</FileUploadButton> */}
								<RemoveButton className='remove-resource-button' onClick={handleRemoveResource}>Delete<RemoveIcon/></RemoveButton>
							</>
							}
							<EditButton onClick={handleToggleEdit}>{editing ? `Save` : `Edit`}{editing ? <SaveIcon/> : <></>}</EditButton>
						</Buttons>
					</Preview>
				</Style>
				{editing &&
					<InnerContainer>
						<Column>
							<h4>
								copyrighted
								<SwitchToggle on={copyrighted} setToggle={handleToggleCopyRighted} data_key='copyrighted' />
							</h4>

							<h4>
								physical copy exists
								<SwitchToggle on={physicalCopyExists} setToggle={handleTogglePhysicalCopyExists} data_key='physicalCopyExists' />
							</h4>

							<h4>
								published
								<SwitchToggle on={published} setToggle={handleTogglePublish} data_key='published' />
							</h4>

							<h4>
								full video
								<SwitchToggle on={fullVideo} setToggle={handleToggleFullVideo} data_key='fullVideo' />
							</h4>
						</Column>

						<Column>
							<div><Title><h4>Email:</h4><TitleEdit type='text' value={requesterEmail} onChange={handleResourceEmail}/></Title></div>
							<Type>
								<h4>Type:</h4>
								<TypeButton type='button' selected={resourceType === `video`} onClick={handleTypeChange} data-type='video'>Video</TypeButton>
								<TypeButton type='button' selected={resourceType === `audio`} onClick={handleTypeChange} data-type='audio'>Audio</TypeButton>
								<TypeButton type='button' selected={resourceType === `image`} onClick={handleTypeChange} data-type='image'>Image</TypeButton>
								<TypeButton type='button' selected={resourceType === `text`} onClick={handleTypeChange} data-type='text'>Text</TypeButton>
							</Type>
						</Column>

						<Column>
							<h4>Metadata</h4>
							<textarea onChange={handleResourceMetadata} value={metadata} rows={6}/>
						</Column>

					</InnerContainer>
				}
			</BoxRow>
		)
	}
}

export default ResourceOverview