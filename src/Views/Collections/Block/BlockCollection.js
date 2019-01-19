import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import BlockItem from './BlockItem'

import arrowLeft from './../../../Assets/Collections/arrow-right.svg'
import arrowRight from './../../../Assets/Collections/arrow-right.svg'

const StyledBlockCollection = styled.div`
	padding: 2rem;

	& > div {
		position: relative;
	}
`,

	CollectionHeader = styled.div`
		display: grid;
		grid-template-columns: 18rem auto;
		justify-items: start;
		padding-bottom: 2rem;

		& > p {
			color: #a4a4a4;
		}

		& a {
			color: black;
			text-decoration: none;
		}
	`,

	SlideWrapper = styled.div`
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: ${props => 'repeat(' + props.count + ', 17.8rem)'};
		grid-gap: 5rem;

		overflow-x: scroll;
		overflow-y: hidden;

		will-change: overflow;

		scroll-behavior: smooth;

		::-webkit-scrollbar {
			background: transparent;
		}

		& > div:last-child {
			padding-right: 6rem;
		}
	`,

	Arrow = styled.div`

		display: flex;
		align-items: center;
		justify-content: center;

		position: absolute;
		top: 0;

		height: 10rem;
		width: 6rem;

		cursor: pointer;

		&.right{
			right: 0;
			background-image: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));

			& > div {
				height: 1.5rem;
				width: 1.5rem;

				transition: opacity .25s ease-in-out;
				opacity: ${props => props.right ? '0' : '1'};
				background-image: url(${arrowRight});
				background-size: cover;
			}
		}

		&.left {
			left: ${props => props.hideLeft ? '-100rem' : '0'};

			transition: opacity .25s ease-in-out;
			opacity: ${props => props.left ? '0' : '1'};
			background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));

			& > div {
				height: 1.5rem;
				width: 1.5rem;

				transition: opacity .25s ease-in-out;
				opacity: ${props => props.left ? '0' : '1'};
				background-image: url(${arrowLeft});
				background-size: cover;
			}
		}

	`

export default class BlockCollection extends Component {
	constructor(props) {
		super(props)

		this.state = {
			left: true,
			hideLeft: true
		}

		this.wrapper = React.createRef()

		this.scrollListener = this.scrollListener.bind(this)
		this.scrollLeft = this.scrollLeft.bind(this)
		this.scrollRight = this.scrollRight.bind(this)
	}

	scrollListener(e) {
		if (e.target.scrollLeft === 0) {
			this.setState({
				left: true
			}, () => {
				setTimeout(() => {
					this.setState({
						hideLeft: true
					})
				}, 250)
			})
		} else if (e.target.scrollLeft !== 0) {
			this.setState({
				hideLeft: false
			}, () => {
				this.setState({
					left: false
				})
			})
		}
	}

	scrollLeft() {
		this.wrapper.current.scrollBy({
			left: -179
		})
	}

	scrollRight() {
		this.wrapper.current.scrollBy({
			left: 178
		})
	}

	render() {
		const { name, count } = this.props.data
		return (
			<StyledBlockCollection>
				<CollectionHeader>
					<Link to={'/'}>{name}</Link>
					<p>{count} Videos</p>
				</CollectionHeader>
				<div>
					<Arrow className='left' left={this.state.left} hideLeft={this.state.hideLeft} onClick={this.scrollLeft}>
						<div />
					</Arrow>
					<SlideWrapper count={count} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
						{/* <SlideWrapper count={count} onScroll={this.scrollListener} onScrollCapture={this.scrollListener}> */}
						{
							_VideoPreview.map(item => <BlockItem key={item.contentId} data={item} />)
						}
					</SlideWrapper>
					<Arrow className='right' onClick={this.scrollRight}>
						<div />
					</Arrow>
				</div>
			</StyledBlockCollection>
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
	},
	{
		'contentId': 5,
		'name': 'Pauvre Garcon',
		'thumbnail': '',
		'collection': 'French Class',
		'translation': true,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 6,
		'name': 'Mama Mia',
		'thumbnail': '',
		'collection': 'Collection 117',
		'translation': false,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 7,
		'name': 'Francois de Villeneuve',
		'thumbnail': '',
		'collection': 'French Class',
		'translation': false,
		'captions': true,
		'annotations': false
	},
	{
		'contentId': 8,
		'name': 'M. Lemieux',
		'thumbnail': '',
		'collection': 'French Class',
		'translation': true,
		'captions': false,
		'annotations': true
	}
]
