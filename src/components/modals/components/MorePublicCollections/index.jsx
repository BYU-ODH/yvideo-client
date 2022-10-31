import React from 'react'

import {
	PublicMoreListCollectionContainer,
} from 'containers'

import {
	Wrapper,
	Title,
	Button,
} from './styles'

const MorePublicCollections = props => {

	const {
		publicCollections,
		ownerName,
	} = props.viewstate

	const {
		handleSubmit,
		toggleModal,
	} = props.handlers

	return (
		<Wrapper onSubmit={handleSubmit}>
			{ownerName ?
				<Title><h4>More Public Collections from:</h4> {ownerName}</Title>
				: ``
			}
			<>
				{
					Object.keys(publicCollections).map(key =>
						<PublicMoreListCollectionContainer key={key} collection={publicCollections[key]} content={publicCollections[key].content}/>
						,
					)
				}
			</>

			<div>
				<Button id='More-Public-Collections-Exit' type='button' onClick={toggleModal}>Exit</Button>
			</div>
		</Wrapper>
	)
}

export default MorePublicCollections
