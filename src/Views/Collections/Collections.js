import React, { Component } from 'react'
import Cookies from 'js-cookie'

import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ListCollection from './List/ListCollection'
import BlockCollection from './Block/BlockCollection'

import blockView from './../../Assets/Collections/block-view.svg'
import listView from './../../Assets/Collections/list-view.svg'

const Container = styled.div`
		max-width: 100rem;

		padding: 8.4rem 2.4rem 0 2.4rem;
		margin: 0 auto;

		& header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 2rem;

			& > div {
				display: flex;
				align-items: center;

				& > h3 {
					font-weight: bold;
					font-size: 1.2rem;
				}

				& a {
					font-weight: 300;
					font-size: 1.2rem;
					text-decoration: none;
					color: #000;
				}

				& > button {
					
				}
			}

		}
	`,

	ViewToggle = styled.button`
		background: url(${props => props.block ? listView : blockView}) center no-repeat;
		background-size: cover;
		border: none;
		height: 1.5rem;
		width: 1.5rem;
		margin-left: 5rem;
		outline: none;
		cursor: pointer;
	`

export class Collections extends Component {

	constructor(props) {
		super(props)

		this.state = {
			previewEndpoint: process.env.REACT_APP_YVIDEO_SERVER + '/api/user/preview/4',
			preview: [],
			recent: [],
			block: false
		}

		this.toggleBlock = this.toggleBlock.bind(this)
		this.getTestData = this.getTestData.bind(this)
	}

	getTestData(url = '', data = { preview: _CollectionPreview }) {
		return new Promise((resolve, reject) => {
			if (data !== {}) return resolve(data)
			else return reject('YOU LOSE!')
		})
	}

	toggleBlock() {
		this.setState({
			block: !this.state.block
		})
	}

	componentWillMount() {
		this.getTestData(this.state.previewEndpoint)
			.then(response => this.setState({ preview: response.preview }))
			.catch(error => console.error(error))

		if (Cookies.get('block') !== 'true' || 'false')
			Cookies.set('block', this.state.block)

		this.setState({
			block: Cookies.get('block')
		})
	}

	render() {
		const { isProf, isAdmin } = this.props.stateVars
		return (
			<Container>
				<header>
					<div>
						<h3>Collections</h3>
					</div>
					<div>
						{
							(isProf || isAdmin) &&
							<Link to={'/collection-manager'} >Manage Collections</Link>
						}
						<ViewToggle block={this.state.block} onClick={this.toggleBlock} />
					</div>
				</header>
				<div className='list'>
					{
						this.state.block ?
							this.state.preview.map(item => <BlockCollection key={item.id} data={item} />)
							:
							this.state.preview.map(item => <ListCollection key={item.id} data={item} />)
					}
				</div>
			</Container>
		)
	}
}

export default Collections

const _CollectionPreview = [
	{
		'count': 4,
		'name': 'American Heritage',
		'url': 'https://s3-alpha.figma.com/img/8cab/3ce4/012ce704e985c8ceef98d0c81e9c3f00',
		'id': 16
	},
	{
		'count': 4,
		'name': 'Germ 101 - Term Videos',
		'url': 'https://s3-alpha.figma.com/img/77cd/6ec1/8f49d9585034111bbc6453e50c9e6997',
		'id': 8
	},
	{
		'count': 4,
		'name': 'MTV Music Videos',
		'url': 'https://s3-alpha.figma.com/img/41e0/198a/adf1e2025f5bdd1213b5748b79953e9b',
		'id': 17
	},
	{
		'count': 4,
		'name': 'Yoga Meditation',
		'url': 'https://s3-alpha.figma.com/img/fc1c/6b87/272178796ef6b666b6befb1723d495d8',
		'id': 20
	}
]