import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import {
	ListCollection,
	BlockCollection,
} from 'components/bits'

import {
	PublicListCollectionContainer,
} from 'containers'

import Style, { ViewToggle, Help, Search, SearchMobile, SearchIcon, FeedbackMessage } from './styles'

import helpIcon from 'assets/manage-collection-help-circle.svg'

export default class Collections extends PureComponent {

	render() {

		const {
			user,
			displayBlocks,
			collections,
			isMobile,
			publicCollections,
			searchQuery,
			hasCollectionPermissions
		} = this.props.viewstate

		const {
			toggleCollectionsDisplay,
			handleShowHelp,
			handleShowTip,
			toggleTip,
			handleSearchQuerySubmit,
			handleSearchTextChange,
		} = this.props.handlers

		// collections.sort((a, b) => a.name > b.name ? 1 : -1)

		const setNoCollections = () => {
			setTimeout(() => {
				if(document.getElementById(`collection-message`) !== null)
					document.getElementById(`collection-message`).innerHTML = `<p>There are no collections</p>`
				if(document.getElementById(`message-public-collection`) !== null)
					document.getElementById(`message-public-collection`).innerHTML = `<p>There are no public collections</p>`
			}, 2000)
		}

		return (
			<Style>
				<header className='collections-header'>
					<div>
						<h3>Collections &nbsp;&nbsp;&nbsp;
							<Help id='collections-help-documentation'
								src={helpIcon}
								onClick={handleShowHelp}
								onMouseEnter={e => handleShowTip(`help`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y + 10, width: e.currentTarget.offsetWidth})}
								onMouseLeave={e => toggleTip()}
							/></h3>
					</div>
					<div>
						{
							!isMobile && <ViewToggle displayBlocks={displayBlocks} onClick={toggleCollectionsDisplay} onMouseEnter={e => handleShowTip(`list-block`, {x: e.target.offsetLeft, y: e.target.offsetTop + 12, width: e.currentTarget.offsetWidth})} onMouseLeave={toggleTip}/>
						}
						{
							user !== null && user.roles < 3 &&
								<h3>
									<Link to={`/manager`} onClick={toggleTip} onMouseEnter={e => handleShowTip(`manage-collections`, {x: e.target.offsetLeft, y: e.target.offsetTop+20, width: e.currentTarget.offsetWidth})} onMouseLeave={e => toggleTip()}>Manage Collections</Link>
								</h3>
						}
					</div>
				</header>
				<div className='list'>

					{ Object.keys(collections).length > 0 ? (
						<>
							{
								isMobile ? Object.keys(collections).map(key => <ListCollection key={key} collection={collections[key]}/>) :
									displayBlocks ?
										Object.keys(collections).map(key => <BlockCollection key={key} collection={collections[key]}/>)
										:
										Object.keys(collections).map(key => <ListCollection key={key} collection={collections[key]}/>)
							}
						</>
					) : (
						<>
							<FeedbackMessage id='collection-message'><p>Loading..</p></FeedbackMessage>
							<p>{	setNoCollections() }</p>
						</>
					) }
				</div>

				{!isMobile ?
					<>
						{
							user !== null && (user.roles < 3 || hasCollectionPermissions) ?
								<header className= 'collections-header'>
									<div>
										<h3>Public Collections &nbsp;&nbsp;&nbsp; </h3>
									</div>
									<div>
									</div>
									<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSearchQuerySubmit}>
										<SearchIcon />
										<input id='resource-search-input' type='search' placeholder={`search public collections`} onChange={handleSearchTextChange} value={searchQuery} />
										{/* <button type='submit'>Search</button> */}
									</Search>
									<div>
										{user.roles === 0 &&
										<h3><Link to={`/public-manager`} >Manage Public Collections</Link></h3>
										}
									</div>
								</header>
								:
								<header className= 'collections-header-not-admin'>
									<div>
										<h3>Public Collections &nbsp;&nbsp;&nbsp; </h3>
									</div>
									<div>
									</div>
									<Search className='resource-search-submit-not-admin' id='searchSubmit' onSubmit={handleSearchQuerySubmit}>
										<SearchIcon />
										<input id='resource-search-input' type='search' placeholder={`search public collections`} onChange={handleSearchTextChange} value={searchQuery} />
									</Search>
								</header>
						}
					</>
					:
					<header className= 'collections-header-mobile'>
						<div>
							<h3>Public Collections &nbsp;&nbsp;&nbsp; </h3>
						</div>
						<>
							<SearchMobile className='resource-search-submit-mobile' id='searchSubmitMobile' onSubmit={handleSearchQuerySubmit}>
								<SearchIcon />
								<input className='resource-search-input-mobile' type='search' placeholder={`search in public collections`} onChange={handleSearchTextChange} value={searchQuery} />
							</SearchMobile>
						</>
					</header>
				}
				<div className='public-collections-list'>
					{
						Object.keys(publicCollections).length > 0 ? (
							<>
								{
									Object.keys(publicCollections).map(key =>
										<PublicListCollectionContainer key={key} collection={publicCollections[key]} defaultSubscription={true} />,
									)
								}
							</>
						)
							:
							<>
								<FeedbackMessage id='message-public-collection'><p>Loading..</p></FeedbackMessage>
								<p>{	setNoCollections() }</p>
							</>
					}
				</div>
			</Style>
		)
	}
}