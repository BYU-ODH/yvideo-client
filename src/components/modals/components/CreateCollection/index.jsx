import React from 'react'

import {
	Input,
	Button,
	secondInput,
} from './styles'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
		<Container onSubmit={handleSubmit}>
				<Row className="mb-4">
					<Col className="px-0">
						<h2>{isPublicCollection ? `Create New Public Collection` : `Create New Collection`}</h2>
					</Col>
				</Row>
				<Row className="my-3">
					<Col className="px-0">
						<Input>
							{
								isSelected === false ?
									<input id='create-collection-input' type={`text`} name={`name`} value={name} onChange={handleNameChange} onFocus={handleInput} placeholder={`Collection name...`} required />
									:
									<input id='create-collection-input' type={`text`} name={`name`} value={name} style={secondInput} onChange={handleNameChange} onBlur={handleInput} placeholder={`Collection name...`} required />
							}
						</Input>
					</Col>
				</Row>
				<Row>
					<Col xs="6" style={{disply:'flex', textAlign:'left'}} className="no-gutters px-0">
						<Button className='std-outline-color' id='create-collection-cancel' type='button' onClick={toggleModal}>Cancel</Button>
					</Col>
					<Col xs="6" style={{disply:'flex', textAlign:'right'}} className="no-gutters px-0">
						<Button className='std-outline-color' id='create-collection-create' type='submit' color={`#0582CA`}>Create</Button>
					</Col>
				</Row>
		</Container>
	)
}

export default CreateCollection