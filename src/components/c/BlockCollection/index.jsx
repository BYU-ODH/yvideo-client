import React, { createRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { BlockItem } from 'components/bits'
import * as sortingRegex from 'components/common/sorting_regex'

import { Container, Header, SlideWrapper, Arrow, BlockEnd, PublicCollectionButton, PublicButton } from './styles.js'

const BlockCollection = props => {

	const {
		user,
		collection,
		isSubscribed,
		isOwner,
	} = props.viewstate

	const {
		handlePublicCollection,
	} = props.handlers

	const {
		name,
		content,
		id,
	} = collection

	const wrapper = createRef()
	const [left, setLeft] = useState(true)
	const [hideLeft, setHideLeft] = useState(true)
	const [right, setRight] = useState(false)
	const [hideRight, setHideRight] = useState(false)

	const scrollLeft = () => {
		wrapper.current.scrollBy({
			left: -179,
		})
	}

	const scrollRight = () => {
		wrapper.current.scrollBy({
			left: 179,
		})
	}

	const scrollListener = e => {

		if (e.target.scrollLeft === 0) {
			setLeft(true)
			setTimeout(() => {
				setHideLeft(true)
			}, 250)
		} else if (e.target.scrollLeft !== 0 && e.target.scrollRight !== 0) {
			setHideLeft(false)
			setHideRight(false)
			setLeft(false)
			setRight(false)
		}
		const expression = e.target.scrollWidth - e.target.getBoundingClientRect().width

		if (Math.round(e.target.scrollLeft) <= Math.round(expression) + 1 && Math.round(e.target.scrollLeft) >= Math.round(expression) - 1) {
			setRight(true)
			setTimeout(() => {
				setHideRight(true)
			}, 250)
		}
	}

	if (!collection || collection === undefined)
		return null

	/* contentIds is filtered for published content
	/* This way, the number of videos (<p>{content.length} Videos</p>) includes the unpublished ones */

	const publishContent = content ? content.filter(item => item.published) : []
	publishContent.sort((a, b) => {
		return a.name.toLowerCase().replace(sortingRegex, `$1`) > b.name.toLowerCase().replace(sortingRegex, `$1`) ?
			1 : -1
	})
	const count = publishContent.length

	return (
		user !== null && collection.published && !collection.public ? (
			<Container isPublic={collection.public}>
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
					<Arrow data-testid='left-arrow' className='left' left={left} hideLeft={hideLeft} onClick={scrollLeft}>
						<div />
					</Arrow>
					<SlideWrapper data-testid='slide-wrapper' className='slide-wrapper' count={count} onScroll={scrollListener} ref={wrapper} onScrollCapture={scrollListener}>
						{
							publishContent.map((item) => {
								return <BlockItem key={item.id} data={item}/>
							})
						}
						<BlockEnd />
					</SlideWrapper>
					{ count > 4 &&
						<Arrow data-testid='right-arrow' className='right' right={right} hideRight={hideRight} onClick={scrollRight}>
							<div />
						</Arrow>
					}
				</div>
			</Container>
		)
			:
			collection.public && !collection.archived && (
				<Container isOwner={isOwner} isPublic={collection.public}>
					<Header>
						<Link to={`/public-manager/${collection.id}`}>{name}</Link>
						{
							count === 0 ?
								<p>This collection is empty</p>
								:
								count === 1 ?
									<p>1 item</p>
									:
									<p>{count} items</p>
						}
						{ isOwner ?
							<p>Owned</p>
							:
							isSubscribed ?
								<p>Subscribed</p>
								:
								<p>Not Subscribed</p>
						}
						<PublicCollectionButton>
							{!isOwner ?
								<PublicButton
									onClick={handlePublicCollection}
									className={`public-button`}
									isSubscribed={isSubscribed}
								>
									{isSubscribed ?
										<h3>Unsubscribe</h3>
										:
										<h3>Subscribe</h3>}
								</PublicButton>
								:
								<h3 id='collection-owned'>You own this collection</h3>
							}
						</PublicCollectionButton>
					</Header>
					<div>
						<Arrow data-testid='left-arrow' className='left' left={left} hideLeft={hideLeft} onClick={scrollLeft}>
							<div />
						</Arrow>
						<SlideWrapper data-testid='slide-wrapper' className='slide-wrapper' count={count} onScroll={scrollListener} ref={wrapper} onScrollCapture={scrollListener}>
							{
								publishContent.map((item) => {
									return <BlockItem key={item.id} data={item}/>
								})
							}
							<BlockEnd />
						</SlideWrapper>
						{ count > 4 &&
							<Arrow data-testid='right-arrow' className='right' right={right} hideRight={hideRight} onClick={scrollRight}>
								<div />
							</Arrow>
						}
					</div>
				</Container>
			)

	)
}

export default BlockCollection
