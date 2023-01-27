import React from 'react'
import { Link } from 'react-router-dom'

import { ManageCollectionContainer } from 'containers'

import { Accordion } from 'components/bits'

import {
	Body,
	PublicContainer,
	CreateButton,
	NoCollection,
	SideMenu,
	Help,
	PlusIcon,
	FeedbackMessage,
} from './styles'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import helpIcon from 'assets/manage-collection-help-circle.svg'

const PublicManager = props => {

	const {
		admin,
		collection,
		path,
		sideLists,
		user,
		activeId,
	} = props.viewstate

	const {
		createNew,
		handleShowHelp,
		handleShowTip,
		toggleTip,
	} = props.handlers

	const empty = props.empty

	return (
		<PublicContainer>
			{ empty !== undefined ? (
				<>
					{ user ? (
						<>
							<h1 id='no-collections'>{ user.name } does not have any collections</h1>
							<div id={`create-button`}>
								<button onClick={createNew}>Create New Public Collection</button>
							</div>
						</>
					) : (
						<>
							<CreateButton onClick={createNew}><PlusIcon/>Public Collection</CreateButton>
							<FeedbackMessage><p>There are no public collections</p></FeedbackMessage>
						</>
					) }
				</>
			) : (
				<>
					<SideMenu>
						<CreateButton id='collection-create' className='std-outline-color' onClick={createNew}><PlusIcon />Public Collection</CreateButton>
						<h4 id='collection-username'>{user ? `${user.name}'s Public Collections` : `Public Collections`}
							<Help
								onMouseEnter={e => handleShowTip(`help`,
									{
										x: e.target.getBoundingClientRect().x + 10,
										y: e.target.getBoundingClientRect().y + 5,
										width: e.currentTarget.offsetWidth,
									})
								}
								onMouseLeave={() => toggleTip()}
							>
								<img id='help-document' alt='' src={helpIcon} onClick={handleShowHelp}/>
							</Help>
						</h4>

						{
							admin &&
							<>
								<Accordion header={`Public Collections`} active>
									{sideLists.publicCollections.map(({ id, name }, index) =>
										<div
											key={index}
											id={`link`}
											className={`${id === activeId ? `active-collection link` : `link`} std-outline-color`}>
											<Link to={`/${path}/${id}`} >
												{name}
											</Link>
										</div>)}
								</Accordion>

								<Accordion header={`Archived`} active>
									{sideLists.publicArchived.map(({ id, name }, index) =>
										<div
											key={index}
											id={`link`}
											className={`${id === activeId ? `active-collection link` : `link`} std-outline-color`}>
											<Link to={`/${path}/${id}`} >
												{name}
											</Link>
										</div>)}
								</Accordion>
							</>
						}

					</SideMenu>
					<Body>
						{collection ?
							admin ?
								// <LabAssistantManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} />
								<ManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} />
								:
								<NoCollection className='only-admin-body'>Permission Denied.</NoCollection>
							:
							<NoCollection id='no-collections-body'>Select a Collection to get started.</NoCollection>}
					</Body>
				</>
			)}
		</PublicContainer>
	)
}

export default PublicManager
