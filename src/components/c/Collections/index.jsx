import React, { PureComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
	ListCollection,
	BlockCollection,
} from 'components/bits'

import Style, { ViewToggle } from './styles'

export default class Collections extends PureComponent {

	render() {

		const {
			isProf,
			isAdmin,
			displayBlocks,
			collections,
			contentIds,
			collectionsLength,
		} = this.props.viewstate



		const {
			toggleCollectionsDisplay,
		} = this.props.handlers

		return (
			<Style>
				<header>
					<div>
						<h3>Collections</h3>
					</div>
					<div>
						{
							(isProf || isAdmin) &&
							<Link to={`/manager`} >Manage Collections</Link>
						}
						<ViewToggle displayBlocks={displayBlocks} onClick={toggleCollectionsDisplay} />
					</div>
				</header>
				<div className='list'>
					{ collectionsLength > 0 ? (
						<>
							{	displayBlocks ?
								Object.keys(collections).map(key => <BlockCollection key={key} collection={collections[key]} contentIds={contentIds} />)
								:
								Object.keys(collections).map(key => <ListCollection key={key} collection={collections[key]} contentIds={contentIds} />)
							}
						</>
					) : (
						<h1>There are no collections to display</h1>
					) }
				</div>
			</Style>
		)
	}
}