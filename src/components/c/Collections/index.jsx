import React from 'react'
import { Link } from 'react-router-dom'

import { ListCollectionContainer, BlockCollectionContainer } from 'containers'

import Style, { ViewToggle, PublicViewToggle, Help, Search, SearchIcon, FeedbackMessage } from './styles'

import helpIcon from 'assets/manage-collection-help-circle.svg'

const Collections = props => {

	const {
		user,
		displayBlocks,
		publicDisplayBlocks,
		collections,
		publicCollections,
		searchQuery,
		hasCollectionPermissions,
		subscribedObj,
	} = props.viewstate

	const {
		toggleCollectionsDisplay,
		togglePublicCollectionsDisplay,
		handleShowHelp,
		handleShowTip,
		toggleTip,
		handleSearchQuerySubmit,
		handleSearchTextChange,
		handleSetSubscribedObj,
	} = props.handlers

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
							onMouseEnter={e => handleShowTip(`help`,
								{
									x: e.target.getBoundingClientRect().x,
									y: e.target.getBoundingClientRect().y + 10,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()}
						/></h3>
				</div>
				<div>
					<ViewToggle
						displayBlocks={displayBlocks}
						role={user.roles}
						hasCollectionPermissions={hasCollectionPermissions}
						onClick={toggleCollectionsDisplay}
						onMouseEnter={e => handleShowTip(`list-block`,
							{
								x: e.target.offsetLeft,
								y: e.target.offsetTop + 12,
								width: e.currentTarget.offsetWidth,
							})
						}
						onMouseLeave={toggleTip} />
					{
						user !== null && (user.roles < 3 || hasCollectionPermissions?.[`ta-permission`] === true) &&
							<h3>
								<Link to={`/manager`}>
									Manage Collections
								</Link>
							</h3>
					}
				</div>
			</header>
			<div className='list'>

				{ Object.keys(collections).length > 0 ? (
					<>
						{
							displayBlocks ?
								Object.keys(collections).map(key =>
									<BlockCollectionContainer key={key} collection={collections[key]} />)
								:
								Object.keys(collections).map(key =>
									<ListCollectionContainer key={key} collection={collections[key]} />)
						}
					</>
				) : (
					<>
						<FeedbackMessage id='collection-message'><p>Loading..</p></FeedbackMessage>
						<p>{	setNoCollections() }</p>
					</>
				) }
			</div>

			<>
				{
					user !== null && (user.roles < 3 || hasCollectionPermissions?.[`ta-permission`] === true) ?
						<header className= 'collections-header'>
							<div>
								<h3>Public Collections &nbsp;&nbsp;&nbsp; </h3>
							</div>
							<div>
							</div>
							<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSearchQuerySubmit}>
								<SearchIcon />
								<input id='resource-search-input' type='search' placeholder={`Search public collections`} onChange={handleSearchTextChange} value={searchQuery} />
							</Search>
							<div>
								<PublicViewToggle
									publicDisplayBlocks={publicDisplayBlocks}
									role={user.roles}
									onClick={togglePublicCollectionsDisplay}
									onMouseEnter={e => handleShowTip(`public-list-block`,
										{
											x: e.target.offsetLeft,
											y: e.target.offsetTop + 12,
											width: e.currentTarget.offsetWidth,
										})
									}
									onMouseLeave={toggleTip} />
								{
									user.roles === 0 &&
									<h3><Link to={`/public-manager`}>Manage Public Collections</Link></h3>
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
								<input id='resource-search-input' type='search' placeholder={`Search public collections`} onChange={handleSearchTextChange} value={searchQuery} />
							</Search>
							<PublicViewToggle
								publicDisplayBlocks={publicDisplayBlocks}
								role={user.roles}
								onClick={togglePublicCollectionsDisplay}
								onMouseEnter={e => handleShowTip(`public-list-block`,
									{
										x: e.target.offsetLeft,
										y: e.target.offsetTop + 12,
										width: e.currentTarget.offsetWidth,
									})
								}
								onMouseLeave={toggleTip} />
							{
								user.roles === 0 &&
								<h3><Link to={`/public-manager`}>Manage Public Collections</Link></h3>
							}
						</header>
				}
			</>

			<div className='public-collections-list'>
				{
					Object.keys(publicCollections).length > 0 ?
						<>
							{ publicDisplayBlocks ?
								Object.keys(publicCollections).map(key =>
									<BlockCollectionContainer
										key={key}
										identifier={key}
										collection={publicCollections[key]}
										handleSetSubscribedObj={handleSetSubscribedObj}
										defaultSubscription={subscribedObj[key].isSubscribed}
									/>)
								:
								Object.keys(publicCollections).map(key =>
									<ListCollectionContainer key={key}
										identifier={key}
										collection={publicCollections[key]}
										handleSetSubscribedObj={handleSetSubscribedObj}
										defaultSubscription={subscribedObj[key].isSubscribed}
									/>)
							}
						</>
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

export default Collections
