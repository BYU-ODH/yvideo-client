import React, { PureComponent } from 'react'
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
					{
						Object.keys(collections).map(item => {
							return displayBlocks ? <BlockCollection key={item.id} data={item} /> : <ListCollection key={item.id} data={item} />
						})
					}
				</div>
			</Style>
		)
	}
}