import React from 'react'

import {
	Wrapper,
	Button,
	secondInput,
} from './styles'

const CreateCollection = props => {

	const {
		name,
		isPublicCollection,
		isSelected,
	} = props.viewstate

	const {
		handleNameChange,
		handleSubmit,
		handleInput,
		toggleModal,
	} = props.handlers

	return (
		<Wrapper onSubmit={handleSubmit}>
			<h2>{isPublicCollection ? `Create New Public Collection` : `Create New Collection`}</h2>
			{
				isSelected === false ?
					<input id='create-collection-input' type={`text`} name={`name`} value={name} onChange={handleNameChange} onFocus={handleInput} placeholder={`Collection name...`} required />
					:
					<input id='create-collection-input' type={`text`} name={`name`} value={name} style={secondInput} onChange={handleNameChange} onBlur={handleInput} placeholder={`Collection name...`} required />
			}
			<div>
				<Button className='std-outline-color' id='create-collection-cancel' type='button' onClick={toggleModal}>Cancel</Button>
				<Button className='std-outline-color' id='create-collection-create' type='submit' color={`#0582CA`}>Create</Button>
			</div>
		</Wrapper>
	)
}

export default CreateCollection