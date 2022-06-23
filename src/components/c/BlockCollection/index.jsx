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
		const { content } = this.props.viewstate.collection
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
		}
		const expression = Math.round(3.8 + (count - 4) * 273.6)
		if (e.target.scrollLeft === expression) {
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

		const {
			user,
			collection,
			isSubscribed,
			isOwner,
		} = this.props.viewstate

		const {
			handlePublicCollection,
		} = this.props.handlers

		const {
			name,
			content,
			id,
		} = this.props.viewstate.collection

		if (!collection || collection === undefined)
			return null

		// contentIds is filtered for published content
		// This way, the number of videos (<p>{content.length} Videos</p>) includes the unpublished ones
		// const contentIds = this.props.contentIds

		const publishContent = content ? content.filter(item => item.published) : []
		publishContent.sort((a, b) => {
			return a.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) > b.name.toLowerCase().replace(/(?:an?|the)? ?(.*)/, `$1`) ?
				1 : -1
		})
		const count = publishContent.length

		return (
			user !== undefined && user !== null && collection.published ? (
				<Container>
					<Header>
						<Link to={`/manager/${id}`}>{name}</Link>
						{
							count === 0 ? (
								<p>This collection is empty</p>
							)
								:
								count === 1 ? (
									<p>1 item</p>
								)
									:
									<p>{count} items</p>
						}
					</Header>
					<div>
						<Arrow data-testid='left-arrow' className='left' left={this.state.left} hideLeft={this.state.hideLeft} onClick={this.scrollLeft}>
							<div />
						</Arrow>
						<SlideWrapper data-testid='slide-wrapper' className='slide-wrapper' count={count} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
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
				collection.public && (
					<Container>
						<Header>
							<Link to={`/public-manager/${collection.id}`}>{name}</Link>
							{
								count === 0 ? (
									<p>This collection is empty</p>
								)
									:
									count === 1 ? (
										<p>1 item
											{ isOwner ?
												<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Owned)</>
												:
												isSubscribed ?
													<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Subscribed)</>
													:
													<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Not Subscribed)</>
											}
										</p>
									)
										:
										<p>{count} items
											{ isOwner ?
												<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Owned)</>
												:
												isSubscribed ?
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
							<SlideWrapper data-testid='slide-wrapper' className='slide-wrapper' count={count} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
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