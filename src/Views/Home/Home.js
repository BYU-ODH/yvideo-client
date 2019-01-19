import React, { Component } from 'react'
import styled from 'styled-components'

import PreviewCollection from './Previews/PreviewCollection'
import PreviewVideo from './Previews/PreviewVideo'

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
							<PreviewVideo key={item.contentId} data={item} />)
							:
							<li>Uh Oh</li>
					}
				</StyledContent>
				<StyledContent>
					<p>Collections</p>
				</StyledContent>
				<StyledContent>
					{
						this.state.preview !== [] ? this.state.preview.map(item =>
							<PreviewCollection
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
		'url': '',
		'id': 16
	},
	{
		'contentCount': 4,
		'name': 'Germ 101 - Term Videos',
		'url': '',
		'id': 8
	},
	{
		'contentCount': 2,
		'name': 'MTV Music Videos',
		'url': '',
		'id': 17
	},
	{
		'contentCount': 8,
		'name': 'Yoga Meditation',
		'url': '',
		'id': 20
	}
],

	_VideoPreview = [
		{
			'contentId': 1,
			'name': 'Emilie Muller',
			'thumbnail': '',
			'collection': 'German Public Content'
		},
		{
			'contentId': 2,
			'name': 'The Longest Yeah Boy Ever',
			'thumbnail': '',
			'collection': 'Collection 117'
		},
		{
			'contentId': 3,
			'name': 'Detroit',
			'thumbnail': '',
			'collection': 'Collection 117'
		},
		{
			'contentId': 4,
			'name': 'Les Choristes',
			'thumbnail': '',
			'collection': 'French Class'
		}
	]

export default Home