import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	UploadButton,
	TypeButton,
	Tabs,
	Tab,
	FileUpload,
} from './styles'

export default class CreateResource extends PureComponent {

	render() {

		const {
			resourceName,
			resourceType,
			requesterEmail,
			metadata,
		} = this.props.viewstate.data

		const {
			handleSubmit,
			handleTextChange,
			handleTypeChange,
			handleFileChange,
			handleFileUpload,
			onKeyPress,
			toggleModal,
			changeTab,
		} = this.props.handlers

		const {
			user,
			data,
			tab,
			selectedFile,
		} = this.props.viewstate

		// TODO: search list all the resources related to the email
		return (
			<>
				{/* <Tabs>
					<Tab selected={tab === `resource`} onClick={changeTab} name={`resource`}>Resource</Tab>
					<Tab selected={tab === `file`} onClick={changeTab} name={`file`}>Upload File</Tab>
				</Tabs> */}

				{/* <Form onKeyPress={onKeyPress} onSubmit={handleSubmit} id='create-resource-form' > */}
				{/* {tab === `resource` && */}
				<Form onKeyPress={onKeyPress} onSubmit={handleSubmit} id='create-resource-form' >
					<h2>Create New Resource</h2>
					{/* <Form onKeyPress={onKeyPress} onSubmit={handleSubmit} id='create-resource-form' > */}
					<label htmlFor='create-resource-name'>
						<span>Name</span>
						<input id='create-resource-name' type='text' name='resourceName' value={resourceName} onChange={handleTextChange} required />
					</label>

					<label htmlFor='create-resource-type'>
						<span>Type</span>
						<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
							<TypeButton type='button' selected={resourceType === `video`} onClick={handleTypeChange} data-type='video'>Video</TypeButton>
							<TypeButton type='button' selected={resourceType === `audio`} onClick={handleTypeChange} data-type='audio'>Audio</TypeButton>
							<TypeButton type='button' selected={resourceType === `image`} onClick={handleTypeChange} data-type='image'>Image</TypeButton>
							<TypeButton type='button' selected={resourceType === `text`} onClick={handleTypeChange} data-type='text'>Text</TypeButton>
						</div>
					</label>

					<label htmlFor='create-resource-requester-email'>
						<span>Email</span>
						<input id='create-resource-requester-email' type='text' name='requesterEmail' value={requesterEmail} onChange={handleTextChange} required />
					</label>

					<label htmlFor='create-resource-metadata'>
						<span>Metadata</span>
					</label>
					<textarea id='create-resource-metadata' name='metadata' value={metadata} onChange={handleTextChange} rows={4} required />

					<div>
						<Button type='button' onClick={toggleModal}>Cancel</Button>
						{/* {selectedFile ?
								<Button type='submit' color={`#0582CA`}>Create</Button>
								:
								<Button disabled={selectedFile === undefined} type='submit' color={`#A0A0A0`}>Create</Button>
							} */}
						<Button type='submit' color={`#0582CA`}>Create</Button>
					</div>
					{/* </Form> */}
				</Form>
				{/* // } */}

				{/* {tab === `file` &&
				<Form onKeyPress={onKeyPress} onSubmit={handleFileUpload} id='upload-file-form'>
					<h2>Upload File</h2>
					<FileUpload>
						<div className='files'>
							<input type='file' className='files-input' onChange={handleFileChange}/>
						</div>
					</FileUpload>

					{selectedFile ?
						<UploadButton type='submit' color={`#0582CA`}>Upload</UploadButton>
						:
						<UploadButton disabled={selectedFile === undefined} type='submit' color={`#A0A0A0`}>Upload</UploadButton>
					}
				</Form>
				} */}
			</>
		)
	}
}
