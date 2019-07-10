import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, adminOn, adminOff, getCollections } from 'redux/actions'

import { withRouter } from 'react-router-dom'

import Editor from './editor/Editor'

import { Link } from 'react-router-dom'

import AccordionMenu from 'components/accordionMenu/AccordionMenu'

import {
	Container,
	Body,
	SideMenu,
	CreateButton,
	Plus,
	NoCollection
} from './styles'

import plus from 'assets/collections/plus.svg'

class Manager extends Component {

	componentDidMount = () => {
		const { getCollections, adminOn } = this.props
		getCollections()
		adminOn()
	}

	shouldComponentUpdate = nextProps => {
		const { collectionsCache, match } = this.props
		return collectionsCache !== nextProps.collectionsCache || match.params.id !== nextProps.match.params.id
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

		const { collectionsCache, match, loaded } = this.props
		const { collections } = collectionsCache

		let selectedCollection

		const sideLists = {
			published: [],
			unpublished: []
		}

		Object.keys(collections).forEach(id => {
			const { published, name } = collections[id]
			if (id === match.params.id) selectedCollection = collections[id]
			if (published) sideLists.published.push({ id, name })
			else sideLists.unpublished.push({ id, name })
		})

		if (!collectionsCache.isFetching) loaded()

		return (
			<Container>
				<SideMenu>

					<h4>My Collections</h4>

					<AccordionMenu header={`Published`} active>
						{sideLists.published.map(({ id, name }, index) => <Link key={index} to={`/manager/${id}`}>{name}</Link>)}
					</AccordionMenu>

					<AccordionMenu header={`Unublished`} active>
						{sideLists.unpublished.map(({ id, name }, index) => <Link key={index} to={`/manager/${id}`}>{name}</Link>)}
					</AccordionMenu>

					<CreateButton onClick={this.createNew}><Plus src={plus} />Create New Collection</CreateButton>

				</SideMenu>
				<Body>
					{selectedCollection === null || selectedCollection === undefined ?
						<NoCollection>Select a Collection to get started.</NoCollection>
						:
						<Editor collection={selectedCollection} />
					}
				</Body>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	collectionsCache: state.collectionsCache,
	editMode: state.editMode,
	state
})

const mapDispatchToProps = {
	getCollections,
	load,
	loaded,
	adminOn,
	adminOff
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager))
