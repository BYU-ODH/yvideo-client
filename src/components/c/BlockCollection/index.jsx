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

		this.user = this.props.viewstate.user
		this.collection = this.props.viewstate.collection
		this.isSubscribed = this.props.viewstate.isSubscribed
		this.isOwner = this.props.viewstate.isOwner

		this.handlePublicCollection = this.props.handlers.handlePublicCollection

		this.wrapper = React.createRef()
	}

	scrollListener = e => {
		const { content } = this.collection
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
		} if (e.target.scrollLeft === Math.round(3.8 + (count - 4) * 273.6) || count <= 4) { // right
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

		if (!this.collection || this.collection === undefined)
			return null

		const { name, content, id } = this.collection
		// contentIds is filtered for published content
		// This way, the number of videos (<p>{content.length} Videos</p>) includes the unpublished ones
		// const contentIds = this.props.contentIds

		const publishContent = content ? content.filter(item => item.published) : []
		const count = publishContent.length
		publishContent.sort((a, b) => {
			return a.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) > b.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) ?
				1 : -1
		})

		return (
			this.user !== undefined && this.user !== null && this.collection.published ? (
				<Container>
					<Header>
						<Link to={`/manager/${id}`}>{name}</Link>
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
					</Header>
					<div>
						<Arrow data-testid='left-arrow' className='left' left={this.state.left} hideLeft={this.state.hideLeft} onClick={this.scrollLeft}>
							<div />
						</Arrow>
						<SlideWrapper data-testid='slide-wrapper' className='slide-wrapper' count={publishContent.length} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
							{
								publishContent.map((item) => {
									return <BlockItem key={item.id} data={item}/>
								})
							}
							<BlockEnd />
						</SlideWrapper>
						{ count > 4 &&
							<Arrow data-testid='right-arrow' className='right' right={this.state.right} hideRight={this.state.hideRight} onClick={this.scrollRight}>
								<div />
							</Arrow>
						}
					</div>
				</Container>
			)
				:
				this.collection.public && (
					<Container>
						<Header>
							<Link to={`/public-manager/${this.collection.id}`}>{name}</Link>
							{
								publishContent.length === 0 ? (
									<p>This collection is empty</p>
								)
									:
									publishContent.length === 1 ? (
										<p>1 item
											{ this.isOwner ?
												<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Owned)</>
												:
												this.isSubscribed ?
													<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Subscribed)</>
													:
													<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Not Subscribed)</>
											}
										</p>
									)
										:
										<p>{publishContent.length} items
											{ this.isOwner ?
												<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Owned)</>
												:
												this.isSubscribed ?
													<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Subscribed)</>
													:
													<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Not Subscribed)</>
											}
										</p>
							}
						</Header>
						<div>
							<Arrow data-testid='left-arrow' className='left' left={this.state.left} hideLeft={this.state.hideLeft} onClick={this.scrollLeft}>
								<div />
							</Arrow>
							<SlideWrapper data-testid='slide-wrapper' className='slide-wrapper' count={publishContent.length} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
								{
									publishContent.map((item) => {
										return <BlockItem key={item.id} data={item}/>
									})
								}
								<BlockEnd />
							</SlideWrapper>
							{ count > 4 &&
								<Arrow data-testid='right-arrow' className='right' right={this.state.right} hideRight={this.state.hideRight} onClick={this.scrollRight}>
									<div />
								</Arrow>
							}
						</div>
					</Container>
				)

		)
	}
}