import plus from 'assets/collections/plus.svg'
import AccordionMenu from 'components/accordionMenu/AccordionMenu'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { adminOff, adminOn, getCollections, load, loaded, toggleModal } from 'redux/actions'
import Editor from './editor/Editor'
import CreateCollection from 'components/forms/CreateCollection'
import { Body, Container, CreateButton, NoCollection, Plus, SideMenu } from './styles'

import { diff } from 'js/util'

/**
 * DO NOT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING
 */

class Manager extends Component {

	log = false

	createNew = async () => {
		this.props.toggleModal({ component: CreateCollection })
	}

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.log) console.groupCollapsed(`Manager: shouldComponentUpdate`)

		const propsDiff = diff(this.props, nextProps)
		const stateDiff = diff(this.state, nextState)

		if (this.log) console.log(`props changes:`, propsDiff)
		if (this.log) console.log(`state changes:`, stateDiff)

		const collectionsCacheDiff = propsDiff.collectionsCache || null
		const collectionsDiff = collectionsCacheDiff === null ? null : propsDiff.collectionsCache.collections || null

		const collectionsFetched = collectionsCacheDiff === null ? false : collectionsCacheDiff.lastFetched !== undefined
		const collectionsChanged = collectionsDiff === null ? false : collectionsCacheDiff.collections !== undefined

		const pageChanged = this.props.match.params.id !== nextProps.match.params.id

		if (this.log) {
			console.table({
				collectionsFetched: {
					value: collectionsFetched
				},
				collectionsChanged: {
					value: collectionsChanged
				},
				pageChanged: {
					value: pageChanged
				}
			})
		}

		const changed = collectionsChanged || collectionsFetched || pageChanged

		if (this.log) console.log(`%c ${changed ? `RENDER` : `NO RENDER`} `, `background: ${changed ? `Maroon` : `Teal`}`)

		if (this.log) console.groupEnd(`Manager: shouldComponentUpdate`)

		return changed
	}

	render() {

		if (this.log) console.error(`Manager: render`)

		const { collectionsCache, match, loaded } = this.props
		const { collections } = collectionsCache

		const sideLists = {
			published: [],
			unpublished: [],
			archived: []
		}

		Object.keys(collections).forEach(id => {
			const { archived, published, name } = collections[id]

			if (archived) sideLists.archived.push({ id, name })
			else if (published) sideLists.published.push({ id, name })
			else sideLists.unpublished.push({ id, name })
		})

		if (!collectionsCache.isFetching) loaded()

		const selectedCollection = this.props.collectionsCache.collections[match.params.id]

		return (
			<Container>
				<SideMenu>

					<h4>My Collections</h4>

					<AccordionMenu header={`Published`} active>
						{sideLists.published.map(({ id, name }, index) => <Link key={index} to={`/manager/${id}`}>{name}</Link>)}
					</AccordionMenu>

					<AccordionMenu header={`Unpublished`} active>
						{sideLists.unpublished.map(({ id, name }, index) => <Link key={index} to={`/manager/${id}`}>{name}</Link>)}
					</AccordionMenu>

					{
						this.props.user.permissions.includes(`admin`) && <AccordionMenu header={`Archived`}>
							{sideLists.archived.map(({ id, name }, index) => <Link key={index} to={`/manager/${id}`}>{name}</Link>)}
						</AccordionMenu>
					}

					<CreateButton onClick={this.createNew}><Plus src={plus} />Create New Collection</CreateButton>

				</SideMenu>
				<Body>
					{match.params.id === null || match.params.id === undefined ?
						<NoCollection>Select a Collection to get started.</NoCollection>
						:
						selectedCollection === undefined ?
							null
							:
							<Editor collection={selectedCollection} />
					}
				</Body>
			</Container>
		)
	}

	componentDidMount = async () => {

		if (this.log) console.warn(`Manager: componentDidMount`)

		const { getCollections, adminOn, user = { permissions: [] } } = this.props
		const privileged = user.permissions.includes(`admin`)
		getCollections(privileged)
		adminOn()
	}

	componentWillUnmount() {
		const { adminOff, load } = this.props
		load()
		adminOff()
	}

}

const mapStateToProps = ({ collectionsCache, editMode, user }) => ({ collectionsCache, editMode, user })

const mapDispatchToProps = {
	toggleModal,
	getCollections,
	load,
	loaded,
	adminOn,
	adminOff
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager))
