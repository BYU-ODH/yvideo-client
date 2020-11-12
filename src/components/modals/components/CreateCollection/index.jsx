import React, { PureComponent } from 'react'

import {
	Wrapper,
	Button,
} from './styles'

export default class CreateCollection extends PureComponent {

	render() {

		const {
			name,
		} = this.props.viewstate

		const {
			handleNameChange,
			handleSubmit,
			toggleModal,
		} = this.props.handlers

		return (
			<Wrapper onSubmit={handleSubmit}>
				<h2>Create New Collection</h2>
				<input id='create-collection-input' type={`text`} name={`name`} value={name} onChange={handleNameChange} placeholder={`Collection name...`} />
				<div>
					<Button id='create-collection-cancel' type='button' onClick={toggleModal}>Cancel</Button>
					<Button id='create-collection-create' type='submit' color={`#0582CA`}>Create</Button>
				</div>
			</Wrapper>
		)
	}
}
