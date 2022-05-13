import React, { PureComponent } from 'react'

import {
	Wrapper,
	Button,
	secondInput,
} from './styles'

export default class CreateCollection extends PureComponent {

	render() {

		const {
			name,
			isPublicCollection,
			isSelected,
		} = this.props.viewstate

		const {
			handleNameChange,
			handleSubmit,
			handleInput,
			toggleModal,
		} = this.props.handlers

		return (
			<Wrapper onSubmit={handleSubmit}>
				<h2>{isPublicCollection ? `Create New Public Collection` : `Create New Collection`}</h2>
				{
					isSelected === false ?
						<input id='create-collection-input' type={`text`} name={`name`} value={name} onChange={handleNameChange} onFocus={handleInput} placeholder={`Collection name...`} />
						:
						<input id='create-collection-input' type={`text`} name={`name`} value={name} style={secondInput} onChange={handleNameChange} onBlur={handleInput} placeholder={`Collection name...`} />
				}
				<div>
					<Button className='std-outline-color' id='create-collection-cancel' type='button' onClick={toggleModal}>Cancel</Button>
					<Button className='std-outline-color' id='create-collection-create' type='submit' color={`#0582CA`}>Create</Button>
				</div>
			</Wrapper>
		)
	}
}
