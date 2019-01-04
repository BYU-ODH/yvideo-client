import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Collection from './Collection/Collection'
import manage from './manage.svg'

// const StyledCollections = styled.div`
// 		padding-top: .5rem;

// 		& p {
// 			margin-top: 0.5rem;
// 			margin-bottom: 0.5rem;
// 		}
// 	`,

// StyledHeading = styled.div`
// 	padding-top: 8.4rem;
// 	display: flex;
// 	flex-direction: row;
// 	margin-left: 3rem;
// 	margin-right: 2rem;

// 	& p {
// 		margin-top: 0.5rem;
// 		margin-bottom: 0.5rem;
// 	}

// 	& embed {
// 		width: 2rem;
// 		height: 2rem;
// 	}

// 	.heading {
// 		box-sizing: border-box;
// 		width: 60%;
// 		font-weight: bold;
// 	}

// 	.manageToggle {
// 		box-sizing: border-box;
// 		width: 40%;
// 		display: flex;
// 	}

// 	.manageToggle:hover {
// 		cursor: pointer;
// 		text-decoration: underline;
// 	}

// 	.manageBanner {
// 		box-sizing: border-box;
// 		padding-right: 1rem;
// 		text-align: right;
// 		width: 80%;
// 	}

// 	.manageIcon {
// 		box-sizing: border-box;
// 		width: 20%;
// 	}

// `,

const StyledCollectionsNew = styled.div`
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
					background: url(${manage});
					border: none;
					height: 1.5rem;
					width: 1.5rem;
					margin-left: 5rem;
					outline: none;
					cursor: pointer;
				}
			}

		}
	`

export class Collections extends Component {

	constructor(props) {
		super(props)

		this.state = {
			previewEndpoint: process.env.REACT_APP_YVIDEO_SERVER + '/api/user/preview/4',
			preview: [],
			recent: []
		}

		this.getData = this.getData.bind(this)
		this.getTestData = this.getTestData.bind(this)
	}

	getData(url = '', data = {}) {
		return fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // No-cors, cors, *same-origin
			cache: 'default', // *Default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // Include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			redirect: 'follow', // Manual, *follow, error
			referrer: 'client' // No-referrer, *client
		})
	}

	getTestData(url = '', data = { preview: _CollectionPreview }) {
		return new Promise((resolve, reject) => {
			if (data !== {}) return resolve(data)
			else return reject('YOU LOSE!')
		})
	}

	componentWillMount() {
		this.getTestData(this.state.previewEndpoint)
			.then(response => this.setState({ preview: response.preview }))
			.catch(error => console.error(error))
	}

	render() {
		return (
			<StyledCollectionsNew>
				<header>
					<div>
						<h3>Collections</h3>
					</div>
					<div>
						<Link to={'/collection-manager'} >Manage Collections</Link>
						<button onClick={() => alert('boop!')} />
					</div>
				</header>
				<div className='list'>
					{
						this.state.preview !== [] ?
							this.state.preview.map(item => <Collection key={item.id} data={item} />)
							:
							<div>I'm in trouble if you see this</div>
					}
				</div>
			</StyledCollectionsNew>
		)
		// return (
		// 	<StyledCollectionsNew>
		// 		<StyledHeading>
		// 			<p className='heading'>Collections</p>
		// 			<div className='manageToggle'>
		// 				<p className='manageBanner'>Manage Collections</p>
		// 				<embed className='manageIcon' src={manage} />
		// 			</div>
		// 		</StyledHeading>
		// 		<StyledCollections>
		// 			{
		// 				this.state.preview !== [] ? this.state.preview.map(item =>
		// 					<CollectionList
		// 						key={item.id}
		// 						thumb={item.url}
		// 						name={item.name}
		// 						length={item.count} />) : <li>Uh Oh</li>
		// 			}
		// 		</StyledCollections>
		// 	</StyledCollectionsNew>
		// )
	}
}

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
export default Collections