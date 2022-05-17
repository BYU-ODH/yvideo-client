import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	TypeButton,
	WarningLabel,
} from './styles'
export default class CreateResource extends PureComponent {

	render() {

		const {
			isCorrectUsername,
		} = this.props.viewstate

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

		let isSelected = false
		// eslint-disable-next-line no-unused-vars
		const select = () => {
			isSelected = !isSelected
		}
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
						<span>NetID</span>
						<input id='create-resource-requester-email' type='text' name='requesterEmail' value={requesterEmail} onChange={handleTextChange} required />
					</label>

					<label htmlFor='create-resource-type'>
						<span>Type</span>
						<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
							<TypeButton className='std-outline-color' id='create-resource-type-video' type='button' selected={resourceType === `video`} onClick={handleTypeChange} data-type='video'><i className='fa fa-video' data-type='video' />Video</TypeButton>
							<TypeButton className='std-outline-color' id='create-resource-type-audio' type='button' selected={resourceType === `audio`} onClick={handleTypeChange} data-type='audio'><i className='fa fa-headphones' data-type='audio' />Audio</TypeButton>
							<TypeButton className='std-outline-color' id='create-resource-type-image' type='button' selected={resourceType === `image`} onClick={handleTypeChange} data-type='image'><i className='fa fa-image' data-type='image' />Image</TypeButton>
							<TypeButton className='std-outline-color' id='create-resource-type-text' type='button' selected={resourceType === `text`} onClick={handleTypeChange} data-type='text'><i className='fa fa-text-width' data-type='text' />Text</TypeButton>
							{/* {console.log(TypeButton.data.type)} */}
						</div>
					</label>

					{/* TODO: metadata can be used later as putting an extra data */}
					{/* <label htmlFor='create-resource-metadata'>
						<span>Metadata</span>
					</label>
					<textarea id='create-resource-metadata' name='metadata' value={metadata} onChange={handleTextChange} rows={4} required /> */}

					<div>
						<Button className='std-outline-color' id='create-resource-cancel' type='button' onClick={toggleModal}>Cancel</Button>
						{resourceName ?
							<Button className='std-outline-color' id='create-resource-create' type='submit' color={`#0582CA`}>Create</Button>
							:
							<Button className='std-outline-color' id='create-resource-create disabled' disabled={resourceName === undefined} type='submit' color={`#A0A0A0`}>Create</Button>
						}
					</div>
				</Form>
				{!isCorrectUsername && <WarningLabel>'{requesterEmail}' does not exist. Please try again.</WarningLabel> }
			</>
		)
	}
}
