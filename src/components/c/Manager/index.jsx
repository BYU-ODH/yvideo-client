import React from 'react'
import { Link } from 'react-router-dom'

import { ManageCollectionContainer, LabAssistantManageCollectionContainer } from 'containers'

import { Accordion } from 'components/bits'

import {
	Body,
	Container,
	CreateButton,
	NoCollection,
	SideMenu,
	Help,
	MenuIcon,
	FeedbackMessage,
	PlusIcon,
	Button,
} from './styles'

import helpIcon from 'assets/manage-collection-help-circle.svg'

const Manager = props => {
	const {
		collection,
		path,
		sideLists,
		user,
		activeId,
		isOpen,
		isMobile,
		isLabAssistant,
	} = props.viewstate

	const {
		createNew,
		handleShowHelp,
		handleShowTip,
		toggleTip,
		handleToggleSideBar,
	} = props.handlers

	return (
		<Container>
			{props.empty !== undefined ? (
				<>
					{user ? (
						<>
							<h1 id='no-collections'>{user.name ? user.name : `This user`} does not have any collections</h1>
							<div id={`create-button`}>
								<button onClick={createNew}>Create New Collection</button>
							</div>
						</>
					) : (
						<>
							<Button onClick={createNew}><PlusIcon />Collection</Button>
							<FeedbackMessage><p>There are no collections</p></FeedbackMessage>
						</>
					)}
				</>
			) : (
				<>
					<>
						{
							isMobile && collection && isOpen === false ?
								<MenuIcon type='button' onClick={handleToggleSideBar}>Back</MenuIcon>
								:
								<SideMenu isOpen={isOpen}>
									{ user.roles <= 2 &&
										<CreateButton id='collection-create' className='std-outline-color' onClick={createNew}><PlusIcon />Collection</CreateButton>
									}
									<h4 id='collection-username'>{user ? `${user.name}'s Collections` : `My Collections`}
										<Help
											onMouseEnter={e => handleShowTip(`help`,
												{
													x: e.target.getBoundingClientRect().x + 10,
													y: e.target.getBoundingClientRect().y + 5,
													width: e.currentTarget.offsetWidth,
												})
											}
											onMouseLeave={() => toggleTip()}
										><img id='help-document' src={helpIcon} alt='' onClick={handleShowHelp} />
										</Help>
									</h4>

									<Accordion id='collection-published' className='std-outline-color' header={`Published`} active>
										{sideLists.published.map(({ id, name }, index) =>
											<div key={index} >
												<Link
													id='link'
													className={`${id === activeId ? `active-collection link` : `link`} std-outline-color`}
													onClick={handleToggleSideBar}
													to={`/${path}/${id}`} >{name}
												</Link>
											</div>)}
									</Accordion>

									<Accordion header={`Unpublished`} className='std-outline-color' active>
										{sideLists.unpublished.map(({ id, name }, index) =>
											<div key={index} >
												<Link
													id='link'
													className={`${id === activeId ? `active-collection link` : `link`} std-outline-color`}
													onClick={handleToggleSideBar}
													to={`/${path}/${id}`}>{name}
												</Link>
											</div>)}
									</Accordion>

									{
										<Accordion header={`Archived`} className='std-outline-color'>
											{sideLists.archived.map(({ id, name }, index) =>
												<div key={index} >
													<Link
														id='link'
														className={`${id === activeId ? `active-collection link` : `link`} std-outline-color`}
														to={`/${path}/${id}`}>{name}
													</Link>
												</div>)}
										</Accordion>
									}

								</SideMenu>
						}
					</>
					<Body>
						{
							isMobile ?
								isOpen ?
									null
									:
									collection ?
										!isLabAssistant ?
											<ManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} />
											:
											<LabAssistantManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} />
										:
										<NoCollection id='no-collections-body'>Select a Collection to get started.</NoCollection>

								:
								collection ?
									!isLabAssistant ?
										<ManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} />
										:
										<LabAssistantManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} />
									:
									<NoCollection id='no-collections-body'>Select a Collection to get started.</NoCollection>
						}
					</Body>
				</>
			)}
		</Container>
	)
}

export default Manager
