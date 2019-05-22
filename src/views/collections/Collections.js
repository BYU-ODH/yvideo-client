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
		const { getCollections, loaded } = this.props

		this.setState({
			block: localStorage.getItem(`blockmode`) === `true`
		})

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
		this.props.load()
	}

	toggleBlock = () => {
		localStorage.setItem(`blockmode`, !this.state.block)
		this.setState({
			block: !this.state.block
		})
	}

	render() {
		const { isProf, isAdmin, collections } = this.props
		const { block } = this.state

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
	collections: state.collections,
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
