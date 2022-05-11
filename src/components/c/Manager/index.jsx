import React, { PureComponent } from 'react'
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

export default class Manager extends PureComponent {
	render() {
		const {
			admin,
			collection,
			path,
			sideLists,
			user,
			activeId,
			isOpen,
			isMobile,
			isLabAssistant,
		} = this.props.viewstate

		const {
			createNew,
			handleShowHelp,
			handleShowTip,
			toggleTip,
			handleToggleSideBar,
		} = this.props.handlers

		return (
			<Container>
				{this.props.empty !== undefined ? (
					<>
						{user ? (
							<>
								<h1 id='no-collections'>{user.name} does not have any collections</h1>
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
										<CreateButton id='collection-create' className='std-outline-color' onClick={createNew}><PlusIcon />Collection</CreateButton>
										<h4 id='collection-username'>{user ? `${user.name}'s Collections` : `My Collections`}
											<Help
												onMouseEnter={e => handleShowTip(`help`, { x: e.target.getBoundingClientRect().x + 10, y: e.target.getBoundingClientRect().y + 5, width: e.currentTarget.offsetWidth })}
												onMouseLeave={e => toggleTip()}
											><img id='help-document' src={helpIcon} onClick={handleShowHelp} />
											</Help>
										</h4>

										<Accordion id='collection-published' className='std-outline-color' header={`Published`} active>
											{sideLists.published.map(({ id, name }, index) => <div key={index}><Link id={`link`} className={`${id === activeId ? `active-collection link` : `link`} std-outline-color`} onClick={handleToggleSideBar} to={`/${path}/${id}`} >{name}</Link></div>)}
										</Accordion>

										<Accordion header={`Unpublished`} className='std-outline-color' active>
											{sideLists.unpublished.map(({ id, name }, index) => <div key={index} ><Link id={`link`} className={`${id === activeId ? `active-collection link` : `link`} std-outline-color`} onClick={handleToggleSideBar} to={`/${path}/${id}`}>{name}</Link></div>)}
										</Accordion>

										{
											admin && <Accordion header={`Archived`} className='std-outline-color'>
												{sideLists.archived.map(({ id, name }, index) => <div key={index} ><Link id={`link`} className={`${id === activeId ? `active-collection link` : `link`} std-outline-color`} to={`/${path}/${id}`} >{name}</Link></div>)}
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
}