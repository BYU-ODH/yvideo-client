import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import {
	ListCollection,
	BlockCollection,
} from 'components/bits'

import Style, { ViewToggle, Help, Button } from './styles'

import helpIcon from 'assets/manage-collection-help-circle.svg'

export default class Collections extends PureComponent {

	render() {

		const {
			isProf,
			isAdmin,
			displayBlocks,
			collections,
			publicCollections,
		} = this.props.viewstate

		const {
			toggleCollectionsDisplay,
			handleShowHelp,
			handleShowTip,
			toggleTip,
		} = this.props.handlers

		return (
			<Style>
				<header>
					<div>
						<h3>Collections &nbsp;&nbsp;&nbsp;
							<Help id='collections-help-documentation'
								src={helpIcon} onClick={handleShowHelp}
								onMouseEnter={e => handleShowTip(`help`, {x: e.target.offsetLeft, y: e.target.offsetTop, width: e.currentTarget.offsetWidth})}
								onMouseLeave={e => toggleTip()}
							/></h3>
					</div>
					<div>
						{
							(isProf || isAdmin) &&
							<Link to={`/manager`} onClick={toggleTip} onMouseEnter={e => handleShowTip(`manage-collections`, {x: e.target.offsetLeft, y: e.target.offsetTop, width: e.currentTarget.offsetWidth})} onMouseLeave={e => toggleTip()}>Manage Collections</Link>
						}
						<ViewToggle displayBlocks={displayBlocks} onClick={toggleCollectionsDisplay} onMouseEnter={e => handleShowTip(`list-block`, {x: e.target.offsetLeft, y: e.target.offsetTop, width: e.currentTarget.offsetWidth})} onMouseLeave={toggleTip}/>
					</div>
				</header>
				<div className='list'>

					{ Object.keys(collections).length > 0 ? (
						<>
							{	displayBlocks ?
								Object.keys(collections).map(key => <BlockCollection key={key} collection={collections[key]}/>)
								:
								// TODO: need to ask if this could have be returned with content
								Object.keys(collections).map(key => <ListCollection key={key} collection={collections[key]}/>)
							}
						</>
					) : (
						<>
							<h1 id='message'>Loading</h1>
							{
								<>
									{
										setTimeout(() => {
											if(document.getElementById(`message`) != null)
												document.getElementById(`message`).innerHTML = `There are no collections`

										}, 2000)
									}
								</>
							}
						</>
					) }
				</div>

				<header>
					<div>
						<h3>Public Collections &nbsp;&nbsp;&nbsp;
							<Help id='collections-help-documentation'
								src={helpIcon} onClick={handleShowHelp}
								onMouseEnter={e => handleShowTip(`help`, {x: e.target.offsetLeft, y: e.target.offsetTop, width: e.currentTarget.offsetWidth})}
								onMouseLeave={e => toggleTip()}
							/></h3>
					</div>
					<div>
						<Link to={`/search-public-collections`}>Search Public Collections</Link>
					</div>
				</header>
				<div className='public-collections-list'>

					{ Object.keys(publicCollections).length > 0 ? (
						<>
							{	displayBlocks ?
								Object.keys(publicCollections).map(key => <BlockCollection key={key} collection={publicCollections[key]}/>)
								:
								Object.keys(publicCollections).map(key => <ListCollection key={key} collection={publicCollections[key]}/>)
							}
						</>
					) : ``
					}
				</div>
			</Style>
		)
	}
}