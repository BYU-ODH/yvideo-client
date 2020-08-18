import React, { PureComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
	ListCollection,
	BlockCollection,
} from 'components/bits'

import Style, { ViewToggle, Help } from './styles'

import helpIcon from 'assets/manage-collection-help-circle.svg'

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
			handleShowHelp,
		} = this.props.handlers

		return (
			<Style>
				<header>
					<div>
						<h3>Collections &nbsp;&nbsp;&nbsp;<Help src={helpIcon} onClick={handleShowHelp}/></h3>
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
								Object.keys(collections).map(key => <BlockCollection key={key} collection={collections[key]}/>)
								:
								Object.keys(collections).map(key => <ListCollection key={key} collection={collections[key]}/>)
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