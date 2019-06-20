import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, adminOn, adminOff, getPrivilegedCollections } from 'redux/actions'

import { withRouter } from 'react-router-dom'

import Editor from './editor/Editor'

import { Link } from 'react-router-dom'

import AccordionMenu from 'components/accordionMenu/AccordionMenu'

import { Container, Body, SideMenu, NoCollection, CreateButton, Plus } from './styles'

import plus from 'assets/collections/plus.svg'

class Manager extends Component {
	constructor(props) {
		super(props)

		this.state = {
			matchingCollection: {},
			publishedColls: [],
			unpublishedColls: []
		}
	}

	componentDidMount() {

		this.props.getPrivilegedCollections(this.props.loaded)

		const { collections } = this.state

		this.props.adminOn()

		this.setState({
			matchingCollection: collections.filter(coll => coll.id.toString() === this.props.match.params.id)[0],
			publishedColls: collections.filter(item => item.published && !item.archived),
			unpublishedColls: collections.filter(item => !item.published && !item.archived)
		})
	}

	shouldComponentUpdate(nextProps) {
		return this.props.collections !== nextProps.collections
	}

	componentWillUnmount() {
		const { adminOff, load } = this.props
		load()
		adminOff()
	}

	createNew = () => {
		alert(`I'm not ready yet!`)
	}

	render() {

		const { matchingCollection, publishedColls, unpublishedColls } = this.state

		console.log(`manager rendered`, unpublishedColls)

		const displayEditor = matchingCollection !== undefined && matchingCollection !== null && Object.entries(matchingCollection).length > 0 && matchingCollection.constructor === Object

		return (
			<Container>
				<SideMenu>

					<h4>My Collections</h4>

					<AccordionMenu header={`Published`} active>
						{publishedColls.map(item => <Link key={item.id} to={`/manager/${item.id}`}>{item.name}</Link>)}
					</AccordionMenu>

					<AccordionMenu header={`Unublished`} active>
						{unpublishedColls.map(item => <Link key={item.id} to={`/manager/${item.id}`}>{item.name}</Link>)}
					</AccordionMenu>

					<CreateButton onClick={this.createNew}><Plus src={plus} />Create New Collection</CreateButton>

				</SideMenu>
				<Body>
					{displayEditor ?
						<Editor collection={matchingCollection} />
						:
						<NoCollection>Select a Collection to get started.</NoCollection>
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
	getPrivilegedCollections,
	load,
	loaded,
	adminOn,
	adminOff
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager))
