import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BlockItem from './BlockItem'

import { Container, Header, SlideWrapper, Arrow } from './styles.js'

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
			<Container>
				<Header>
					<Link to={`/`}>{name}</Link>
					<p>{count} Videos</p>
				</Header>
				<div>
					<Arrow className='left' left={this.state.left} hideLeft={this.state.hideLeft} onClick={this.scrollLeft}>
						<div />
					</Arrow>
					<SlideWrapper count={count} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
						{
							_VideoPreview.map(item => <BlockItem key={item.contentId} data={item} />)
						}
					</SlideWrapper>
					<Arrow className='right' onClick={this.scrollRight}>
						<div />
					</Arrow>
				</div>
			</Container>
		)
	}
}

const _VideoPreview = [
	{
		'contentId': 1,
		'name': `Emilie Muller`,
		'thumbnail': `../image.jpg`,
		'collection': `German Public Content`,
		'translation': true,
		'captions': true,
		'annotations': true
	},
	{
		'contentId': 2,
		'name': `The Longest Yeah Boy Ever`,
		'thumbnail': `https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
		'collection': `Collection 117`,
		'translation': false,
		'captions': true,
		'annotations': true
	},
	{
		'contentId': 3,
		'name': `Detroit`,
		'thumbnail': ``,
		'collection': `Collection 117`,
		'translation': true,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 4,
		'name': `Les Choristes`,
		'thumbnail': ``,
		'collection': `French Class`,
		'translation': false,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 5,
		'name': `Pauvre Garcon`,
		'thumbnail': ``,
		'collection': `French Class`,
		'translation': true,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 6,
		'name': `Mama Mia`,
		'thumbnail': ``,
		'collection': `Collection 117`,
		'translation': false,
		'captions': false,
		'annotations': false
	},
	{
		'contentId': 7,
		'name': `Francois de Villeneuve`,
		'thumbnail': ``,
		'collection': `French Class`,
		'translation': false,
		'captions': true,
		'annotations': false
	},
	{
		'contentId': 8,
		'name': `M. Lemieux`,
		'thumbnail': ``,
		'collection': `French Class`,
		'translation': true,
		'captions': false,
		'annotations': true
	}
]
