import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	TypeButton,
} from './styles'

export default class CreateResource extends PureComponent {

	render() {

		const {
			resourceName,
			resourceType,
			requesterEmail,
		} = this.props.viewstate.data

		const {
			handleSubmit,
			handleTextChange,
			handleTypeChange,
			onKeyPress,
			toggleModal,
		} = this.props.handlers

		// TODO: search list all the resources related to the email
		return (
			<>
				<Form onKeyPress={onKeyPress} onSubmit={handleSubmit} id='create-resource-form' >
					<h2>Create New Resource</h2>

					<label htmlFor='create-resource-name'>
						<span>Title</span>
						<input id='create-resource-name' type='text' name='resourceName' value={resourceName} onChange={handleTextChange} required />
					</label>

					<label htmlFor='create-resource-requester-email'>
						<span>Email</span>
						<input id='create-resource-requester-email' type='text' name='requesterEmail' value={requesterEmail} onChange={handleTextChange} required />
					</label>

					<label htmlFor='create-resource-type'>
						<span>Type</span>
						<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
							<TypeButton id='create-resource-type-video' type='button' selected={resourceType === `video`} onClick={handleTypeChange} data-type='video'>Video</TypeButton>
							<TypeButton id='create-resource-type-audio' type='button' selected={resourceType === `audio`} onClick={handleTypeChange} data-type='audio'>Audio</TypeButton>
							<TypeButton id='create-resource-type-image' type='button' selected={resourceType === `image`} onClick={handleTypeChange} data-type='image'>Image</TypeButton>
							<TypeButton id='create-resource-type-text' type='button' selected={resourceType === `text`} onClick={handleTypeChange} data-type='text'>Text</TypeButton>
						</div>
					</label>

					{/* TODO: metadata can be used later as putting an extra data */}
					{/* <label htmlFor='create-resource-metadata'>
						<span>Metadata</span>
					</label>
					<textarea id='create-resource-metadata' name='metadata' value={metadata} onChange={handleTextChange} rows={4} required /> */}

					<div>
						<Button id='create-resource-cancel' type='button' onClick={toggleModal}>Cancel</Button>
						{resourceName ?
							<Button id='create-resource-create' type='submit' color={`#0582CA`}>Create</Button>
							:
							<Button id='create-resource-create' disabled={resourceName === undefined} type='submit' color={`#A0A0A0`}>Create</Button>
						}
					</div>
				</Form>
			</>
		)
	}
}
