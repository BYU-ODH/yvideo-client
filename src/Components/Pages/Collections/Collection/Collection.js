import React, { Component } from 'react'
import styled from 'styled-components'

import CollectionItem from './CollectionItem'

import carrot from './carrot.svg'

const StyledCollectionHead = styled.div`
	display: grid;
	grid-template-columns: 18rem auto 1.5rem;
	justify-items: start;

	padding: 2rem;

	border-top: 1px solid #ccc;

	& > div {
		flex: 1;

		background: url(${carrot}) center no-repeat;
		background-size: contain;
		height: 1.5rem;
		width: 1.5rem;

		transform: ${props => props.isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'};
		transition: transform .25s ease-in-out;
	}

	& > h4 {
		flex: 2;
	}

	& > p {
		flex: 2;
		color: #a4a4a4;
	}

	:hover {
		cursor: pointer;
		text-decoration: underline;
		background: #efefef;
	}
	`,

	StyledCollectionBody = styled.div`

		height: ${props => props.isOpen ? (parseInt(props.count) * 6.5 + 2).toString() + 'rem' : '0'};
		transition: height .25s ease-in-out;

		overflow: hidden;
	`

export default class Collection extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isOpen: false
		}

		this.togglePanel = this.togglePanel.bind(this)
	}

	togglePanel() {
		console.log('boop')
		this.setState({ isOpen: !this.state.isOpen })
	}

	render() {
		const { count, name } = { ...this.props.data }
		return (
			<div>
				<StyledCollectionHead isOpen={this.state.isOpen} onClick={this.togglePanel} >
					<h4>{name}</h4>
					<p>{count} Videos</p>
					<div />
				</StyledCollectionHead>
				<StyledCollectionBody isOpen={this.state.isOpen} count={count}>
					{
						_VideoPreview.map(item => <CollectionItem key={item.contentId} data={item} />)
					}
				</StyledCollectionBody>
			</div>
		)
	}
}

const _VideoPreview = [
	{
		'contentId': 1,
		'name': 'Emilie Muller',
		'thumbnail': '',
		'collection': 'German Public Content',
		'translation': true,
		'captions': true,
		'annotations': true
	},
	{
		'contentId': 2,
		'name': 'The Longest Yeah Boy Ever',
		'thumbnail': '',
		'collection': 'Collection 117',
		'translation': false,
		'captions': true,
		'annotations': true
	},
	{
		'contentId': 3,
		'name': 'Detroit',
		'thumbnail': '',
		'collection': 'Collection 117',
		'translation': true,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 4,
		'name': 'Les Choristes',
		'thumbnail': '',
		'collection': 'French Class',
		'translation': false,
		'captions': false,
		'annotations': false
	}
]
