import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { LabAssistantManageCollectionContainer, ManageCollectionContainer } from 'containers'

import { Accordion } from 'components/bits'

import {
	Body,
	Container,
	CreateButton,
	NoCollection,
	Plus,
	SideMenu,
	Help,
} from './styles'

import plus from 'assets/plus.svg'
import helpIcon from 'assets/manage-collection-help-circle.svg'

export default class Manager extends PureComponent {
	render() {

		// console.log('render manager')

		const {
			admin,
			collection,
			path,
			sideLists,
			user,
			activeId,
		} = this.props.viewstate

		const {
			createNew,
			handleShowHelp,
			handleShowTip,
			toggleTip,
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
								<h1 className='no-collections'>There are no collections</h1>
								<div id={`create-button`} >
									<button onClick={createNew}>Create New Collection</button>
								</div>
							</>
						) }
					</>
				) : (
					<>
						<SideMenu>

							<h4 className='collection-username'>{user ? `${user.name}'s Collections` : `My Collections`}
								<Help
									onMouseEnter={e => handleShowTip('help', {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
									onMouseLeave={e => toggleTip()}
									><img className='help-document' src={helpIcon} onClick={handleShowHelp}/>
								</Help>
							</h4>

							<Accordion className='collection-published' header={`Published`} active>
								{sideLists.published.map(({ id, name }, index) => <div key={index} className={`${id === activeId ? `active-collection link` : `link`}`}><Link to={`/${path}/${id}`} >{name}</Link></div>)}
							</Accordion>

							<Accordion header={`Unpublished`} active>
								{sideLists.unpublished.map(({ id, name }, index) => <div key={index} className={`${id === activeId ? `active-collection link` : `link`}`}><Link to={`/${path}/${id}`}>{name}</Link></div>)}
							</Accordion>

							{
								admin && <Accordion header={`Archived`}>
									{sideLists.archived.map(({ id, name }, index) => <div key={index} className={`${id === activeId ? `active-collection link` : `link`}`}><Link to={`/${path}/${id}`} >{name}</Link></div>)}
								</Accordion>
							}

							<CreateButton className='collection-create' onClick={createNew}><Plus src={plus} />Create New Collection</CreateButton>

						</SideMenu>
						<Body>
							{collection ?
								user ?
									<LabAssistantManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} />
									:
									<ManageCollectionContainer collection={collection} published={collection.published} archived={collection.archived} />
								:
								<NoCollection className='no-collections-body'>Select a Collection to get started.</NoCollection>}
						</Body>
					</>
				)}
			</Container>
		)
	}
}