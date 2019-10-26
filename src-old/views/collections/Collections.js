import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, getCollections } from 'redux/actions'

import { Link, withRouter } from 'react-router-dom'

import ListCollection from './list/ListCollection'
import BlockCollection from './block/BlockCollection'

import { CollectionStyled, ViewToggle } from './styles'

export class Collections extends Component {
	constructor(props) {
		super(props)

		this.state = {
			block: false
		}
	}

	componentDidMount = async () => {
		const { getCollections, loaded, isAdmin } = this.props

		this.setState({
			block: localStorage.getItem(`blockmode`) === `true`
		})

		try {
			await getCollections(isAdmin)
		} catch (error) {
			console.log(error)
		}

		setTimeout(() => {
			loaded()
		}, 500)
	}

	componentWillUnmount = () => {
		this.props.load()
	}

	toggleBlock = () => {
		localStorage.setItem(`blockmode`, !this.state.block)
		this.setState(prevState => ({
			block: !prevState.block
		}))
	}

	render() {
		const { isProf, isAdmin, collectionsCache } = this.props
		const { block } = this.state

		const collections = Object.keys(collectionsCache.collections).map(key => collectionsCache.collections[key])

		const filteredCollections = collections.filter(collection => !collection.archived)

		return (
			<CollectionStyled>
				<header>
					<div>
						<h3>Collections</h3>
					</div>
					<div>
						{
							(isProf || isAdmin) &&
							<Link to={`/manager`} >Manage Collections</Link>
						}
						<ViewToggle block={block} onClick={this.toggleBlock} />
					</div>
				</header>
				<div className='list'>
					{
						block ?
							filteredCollections.map(item => {
								return <BlockCollection key={item.id} data={item} />
							})
							:
							filteredCollections.map(item => {
								return <ListCollection key={item.id} data={item} />
							})
					}
				</div>
			</CollectionStyled>
		)
	}
}

const mapStateToProps = state => ({
	collectionsCache: state.collectionsCache,
	isProf: state.userInfo.roles.includes(`professor`),
	isAdmin: state.userInfo.roles.includes(`admin`),
	isStudent: state.userInfo.roles.includes(`student`)
})

const mapDispatchToProps = {
	load,
	loaded,
	getCollections
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Collections))
