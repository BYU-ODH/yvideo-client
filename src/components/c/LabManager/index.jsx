import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { ManageCollectionContainer } from 'containers'

import {
	Body,
	Container,
	CreateButton,
	NoCollection,
	Plus,
	SideMenu,
} from './styles'

import plus from 'assets/plus.svg'

export default class LabManager extends PureComponent {
	render() {

		const {
			collection,
		} = this.props.viewstate

		const {
			createNew,
		} = this.props.handlers

		return (
			<Container>
				<SideMenu>

					<h4>Collections</h4>

					<Link key={collection.id} to={`/manager/${collection.id}`}>{collection.name}</Link>)}

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