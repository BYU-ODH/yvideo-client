import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { BlockItem } from 'components/bits'

import { Container, Header, SlideWrapper, Arrow, BlockEnd } from './styles.js'

export default class BlockCollection extends Component {
	constructor(props) {
		super(props)

		this.state = {
			left: true,
			hideLeft: true,
			right: false,
			hideRight: false,
		}

		this.wrapper = React.createRef()
	}

	scrollListener = e => {
		const { content } = this.props.collection
		const publishContent = content ? content.filter(item => item.published) : []
		const count = publishContent.length

		if (e.target.scrollLeft === 0) {
			this.setState({
				left: true,
			}, () => {
				setTimeout(() => {
					this.setState({
						hideLeft: true,
					})
				}, 250)
			})
		} else if (e.target.scrollLeft !== 0 && e.target.scrollRight !== 0) {
			this.setState({
				hideLeft: false,
				hideRight: false,
			}, () => {
				this.setState({
					left: false,
					right: false,
				})
			})
		} if (e.target.scrollLeft === 181 + (count - 5) * 228) { // right
			this.setState({
				right: true,
			}, () => {
				this.setState({
					hideRight: true,
				})
			})
		}
	}

	scrollLeft = () => {
		this.wrapper.current.scrollBy({
			left: -179,
		})
	}

	scrollRight = () => {
		this.wrapper.current.scrollBy({
			left: 179,
		})
	}

	render() {

		const { name, content } = this.props.collection
		// contentIds is filtered for published content
		// This way, the number of videos (<p>{content.length} Videos</p>) includes the unpublished ones
		// const contentIds = this.props.contentIds

		const publishContent = content ? content.filter(item => item.published) : []
		publishContent.sort((a, b) => {
			return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
		})

		return (
			this.props.collection.published && (
				<Container>
					<Header>
						<Link to={`/manager/${this.props.collection.id}`}>{name}</Link>
						{
							publishContent.length === 0 ? (
								<p>This collection is empty</p>
							)
								:
								publishContent.length === 1 ? (
									<p>1 item</p>
								)
									:
									<p>{publishContent.length} items</p>
						}
						{ this.props.collection.id === `public` ? (
							<Link to={`/search-public-collections`}>Search Public Collections</Link>
						) : ``}
					</Header>
					<div>
						<Arrow data-testid='left-arrow' className='left' left={this.state.left} hideLeft={this.state.hideLeft} onClick={this.scrollLeft}>
							<div />
						</Arrow>
						<SlideWrapper data-testid='slide-wrapper' className='slide-wrapper' count={publishContent.length} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
							{
								publishContent.map((item, index) => {
									return <BlockItem key={item.id} data={item}/>
								})
							}
							<BlockEnd />
						</SlideWrapper>
						<Arrow data-testid='right-arrow' className='right' right={this.state.right} hideRight={this.state.hideRight} onClick={this.scrollRight}>
							<div />
						</Arrow>
					</div>
				</Container>
			)
		)
	}
}