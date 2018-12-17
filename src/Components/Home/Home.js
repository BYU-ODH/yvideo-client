import React, { Component } from 'react'
import styled from 'styled-components'

import CollectionPreview from './CollectionPreview/CollectionPreview'
import VideoPreview from './VideoPreview/VideoPreview'

const StyledContent =
	styled.div`
		width: 91.2rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;

		& > p {
			margin-bottom: 1.8rem;
			margin-top: 5rem;
		}
	`,

	StyledHome = styled.div`
		padding-top: 8.4rem;
	`

export class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// previewEndpoint: 'http://10.37.151.57:9000/api/user/preview',
			previewEndpoint: 'https://ayamelbeta.byu.edu/api/user/preview/4',
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

	getTestData(url = '', data = { preview: _CollectionPreview, recent: _VideoPreview }) {
		return new Promise((resolve, reject) => {
			if (data !== {}) return resolve(data)
			else return reject('YOU LOSE!')
		})
	}

	componentWillMount = () => {
		this.getTestData(this.state.previewEndpoint)
			.then(response => this.setState({ preview: response.preview, recent: response.recent }))
			.catch(error => console.error(error))
	}

	render() {
		return (
			<StyledHome>
				<StyledContent>
					<p>Recently Viewed</p>
				</StyledContent>
				<StyledContent>
					{
						this.state.recent !== [] ? this.state.recent.map(item =>
							<VideoPreview
								key={item.contentId}
								thumb={item.thumbnail}
								name={item.name}
								collection={item.collection}
							/>) : <li>Uh Oh</li>
					}
				</StyledContent>
				<StyledContent>
					<p>Collections</p>
				</StyledContent>
				<StyledContent>
					{
						this.state.preview !== [] ? this.state.preview.map(item =>
							<CollectionPreview
								key={item.id}
								thumb={item.url}
								name={item.name}
								length={item.contentCount}
							/>) : <li>Uh Oh</li>
					}
				</StyledContent>

			</StyledHome>
		)
	}
}

// eslint-disable-next-line one-var
const _CollectionPreview = [
	{
		'contentCount': 17,
		'name': 'American Heritage',
		'url': 'https://s3-alpha.figma.com/img/8cab/3ce4/012ce704e985c8ceef98d0c81e9c3f00',
		'id': 16
	},
	{
		'contentCount': 4,
		'name': 'Germ 101 - Term Videos',
		'url': 'https://s3-alpha.figma.com/img/77cd/6ec1/8f49d9585034111bbc6453e50c9e6997',
		'id': 8
	},
	{
		'contentCount': 2,
		'name': 'MTV Music Videos',
		'url': 'https://s3-alpha.figma.com/img/41e0/198a/adf1e2025f5bdd1213b5748b79953e9b',
		'id': 17
	},
	{
		'contentCount': 8,
		'name': 'Yoga Meditation',
		'url': 'https://s3-alpha.figma.com/img/fc1c/6b87/272178796ef6b666b6befb1723d495d8',
		'id': 20
	}
],

_VideoPreview = [
	{
		'contentId': 1,
		'name': 'Emilie Muller',
		'thumbnail': 'https://s3-alpha.figma.com/img/3e99/12b3/3b459ecf36ff1095f600b3ae3e542d97',
		'collection': 'German Public Content'
	},
	{
		'contentId': 2,
		'name': 'The Longest Yeah Boy Ever',
		'thumbnail': 'https://s3-alpha.figma.com/img/8781/74a1/80b73b5e046e9f661060fb139e06653e',
		'collection': 'Collection 117'
	},
	{
		'contentId': 3,
		'name': 'Detroit',
		'thumbnail': 'https://s3-alpha.figma.com/img/92a2/adb3/65405049a9cc385cec3104056d6952c0',
		'collection': 'Collection 117'
	},
	{
		'contentId': 4,
		'name': 'Les Choristes',
		'thumbnail': 'https://s3-alpha.figma.com/img/5b3b/f49a/0352d400fe8db4a1d03fecb8d926af6e',
		'collection': 'French Class'
	}
]

export default Home