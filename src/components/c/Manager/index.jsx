import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { ManageCollectionContainer } from 'containers'

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
			isLabassistantManager,
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
				{ this.props.empty !== undefined ? (
					<>
						{ user ? (
							<>
								<h1 className='no-collections'>{ user.name } does not have any collections</h1>
								<div id={`create-button`}>
									<button onClick={createNew}>Create New Collection</button>
								</div>
							</>
						) : (
							<>
								<Button onClick={createNew}><PlusIcon/>Collection</Button>
								<FeedbackMessage><p>There are no collections</p></FeedbackMessage>
							</>
						) }
					</>
				) : (
					<>
						<>
							{
								isMobile && collection && isOpen === false ?
									<MenuIcon type='button' onClick={handleToggleSideBar}>Back</MenuIcon>
									:
									<SideMenu isOpen={isOpen}>
										<CreateButton className='collection-create' onClick={createNew}><PlusIcon/>Collection</CreateButton>
										<h4 className='collection-username'>{user ? `${user.name}'s Collections` : `My Collections`}
											<Help
												onMouseEnter={e => handleShowTip(`help`, {x: e.target.getBoundingClientRect().x + 10, y: e.target.getBoundingClientRect().y + 5, width: e.currentTarget.offsetWidth})}
												onMouseLeave={e => toggleTip()}
											><img className='help-document' src={helpIcon} onClick={handleShowHelp}/>
											</Help>
										</h4>

										<Accordion className='collection-published' header={`Published`} active>
											{sideLists.published.map(({ id, name }, index) => <div key={index}><Link className={`${id === activeId ? `active-collection link` : `link`}`} onClick={handleToggleSideBar} to={`/${path}/${id}`} >{name}</Link></div>)}
										</Accordion>

										<Accordion header={`Unpublished`} active>
											{sideLists.unpublished.map(({ id, name }, index) => <div key={index} ><Link className={`${id === activeId ? `active-collection link` : `link`}`} onClick={handleToggleSideBar} to={`/${path}/${id}`}>{name}</Link></div>)}
										</Accordion>

										{
											admin && <Accordion header={`Archived`}>
												{sideLists.archived.map(({ id, name }, index) => <div key={index} ><Link className={`${id === activeId ? `active-collection link` : `link`}`} to={`/${path}/${id}`} >{name}</Link></div>)}
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

											<ManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} isLabassistantManager={isLabassistantManager}/>

											:

											<NoCollection className='no-collections-body'>Select a Collection to get started.</NoCollection>

									:
									collection ?
										<ManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} isLabassistantManager={isLabassistantManager} />

										:
										<NoCollection className='no-collections-body'>Select a Collection to get started.</NoCollection>

							}
						</Body>
					</>
				)}
			</Container>
		)
	}
}