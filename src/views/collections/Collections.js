import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load, loaded, found, getCollections } from '../../redux/actions'

import { Link } from 'react-router-dom'

import ListCollection from './list/ListCollection'
import BlockCollection from './block/BlockCollection'

import { SCollection, ViewToggle } from './styles'

export class Collections extends Component {
	constructor(props) {
		super(props)

		this.state = {
			block: false
		}
	}

	componentDidMount = async () => {
		const { found, getCollections, loaded } = this.props

		found()

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
		this.setState({
			block: !this.state.block
		})
	}

	render() {
		const { isProf, isAdmin, collections, block } = this.props

		return (
			<SCollection>
				<header>
					<div>
						<h3>Collections</h3>
					</div>
					<div>
						{
							(isProf || isAdmin) &&
							<Link to={`/collection-manager`} >Manage Collections</Link>
						}
						<ViewToggle block={block} onClick={this.toggleBlock} />
					</div>
				</header>
				<div className='list'>
					{
						block ?
							collections.map(item => {
								return <BlockCollection key={item.id} data={item} />
							})
							:
							collections.map(item => {
								return <ListCollection key={item.id} data={item} />
							})
					}
				</div>
			</SCollection>
		)
	}
}

const mapStateToProps = state => ({
	collections: state.collections,
	isProf: state.userAuth.roles.includes(`professor`),
	isAdmin: state.userAuth.roles.includes(`admin`),
	isStudent: state.userAuth.roles.includes(`student`)
})

const mapDispatchToProps = {
	load,
	loaded,
	found,
	getCollections
}

export default connect(mapStateToProps, mapDispatchToProps)(Collections)
