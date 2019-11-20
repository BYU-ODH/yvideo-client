import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { ManageCollectionContainer } from 'containers'

import { Accordion } from 'components/bits'

import {
	Body,
	Container,
	CreateButton,
	NoCollection,
	Plus,
	SideMenu,
} from './styles'

import plus from 'assets/plus.svg'

export default class Manager extends PureComponent {
	render() {

		const {
			collection,
			sideLists,
			admin,
		} = this.props.viewstate

		const {
			createNew,
		} = this.props.handlers

		return (
			<Container>
				<SideMenu>

					<h4>My Collections</h4>

					<Accordion header={`Published`} active>
						{sideLists.published.map(({ id, name }, index) => <Link key={index} to={`/manager/${id}`}>{name}</Link>)}
					</Accordion>

					<Accordion header={`Unpublished`} active>
						{sideLists.unpublished.map(({ id, name }, index) => <Link key={index} to={`/manager/${id}`}>{name}</Link>)}
					</Accordion>

					{
						admin && <Accordion header={`Archived`}>
							{sideLists.archived.map(({ id, name }, index) => <Link key={index} to={`/manager/${id}`}>{name}</Link>)}
						</Accordion>
					}

					<CreateButton onClick={createNew}><Plus src={plus} />Create New Collection</CreateButton>

				</SideMenu>
				<Body>
					{collection ?
						<ManageCollectionContainer collection={collection} />
						:
						<NoCollection>Select a Collection to get started.</NoCollection>
					}
				</Body>
			</Container>
		)
	}
}