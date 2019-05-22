import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, adminOn, adminOff, getCollections } from 'redux/actions'

import { withRouter } from 'react-router-dom'

import Editor from './editor/Editor'

import { Link } from 'react-router-dom'

import AccordionMenu from 'components/accordionMenu/AccordionMenu'

import { Container, Body, SideMenu, NoCollection, CreateButton, Plus } from './styles'

import plus from 'assets/collections/plus.svg'

class Manager extends Component {

	componentDidMount = async () => {
		const { adminOn, loaded, getCollections } = this.props

		adminOn()

		try {
			await getCollections()
		} catch (error) {
			console.log(error)
		}

		setTimeout(() => {
			loaded()
		}, 500)
	}

	componentWillUnmount = () => {
		const { adminOff, load } = this.props
		load()
		adminOff()
	}

	createNew = () => {
		alert(`I'm not ready yet!`)
	}

	render() {
		const { collections } = this.props
		const { id } = this.props.match.params

		const matchingCollection = collections.filter(coll => coll.id.toString() === id)

		const published = collections.filter(item => item.published && !item.archived)
		const unpublished = collections.filter(item => !item.published && !item.archived)

		return (
			<Container>
				<SideMenu>

					<h4>My Collections</h4>

					<AccordionMenu header={`Published`} active>
						{published.map(item => <Link key={item.id} to={`/manager/${item.id}`}>{item.name}</Link>)}
					</AccordionMenu>

					<AccordionMenu header={`Unublished`}>
						{unpublished.map(item => <Link key={item.id} to={`/manager/${item.id}`}>{item.name}</Link>)}
					</AccordionMenu>

					<CreateButton onClick={this.createNew}><Plus src={plus} />Create New Collection</CreateButton>

				</SideMenu>
				<Body>
					{id === undefined || matchingCollection.length !== 1 ?
						<NoCollection>Select a Collection to get started.</NoCollection>
						:
						<Editor collection={matchingCollection.length > 0 ? matchingCollection[0] : null} />
					}
				</Body>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	collections: state.collections,
	editMode: state.editMode
})

const mapDispatchToProps = {
	getCollections,
	load,
	loaded,
	adminOn,
	adminOff
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager))
