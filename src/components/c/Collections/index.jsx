import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion';

import { ListCollectionContainer, BlockCollectionContainer } from 'containers'

import Style, { ViewToggle, PublicViewToggle, Help, Search, SearchMobile, SearchIcon, FeedbackMessage } from './styles'

import helpIcon from 'assets/manage-collection-help-circle.svg'

const Collections = props => {

	const {
		user,
		displayBlocks,
		publicDisplayBlocks,
		collections,
		isMobile,
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
				<Container className='subheader'>
					<Row className="mb-4"></Row>
					<Row className='justify-content-center align-items-center mb-4 mt-5' width="50%">
						<Col xs="1"></Col>
						<Col className='overflow-auto text-left'>
						<h3>Collections &nbsp;&nbsp;&nbsp;
							<Help id='collections-shelp-documentation'
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
						</Col>
						<Col className="text-right">
						{ !isMobile &&
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
						}
						{
							user !== null && (user.roles < 3 || hasCollectionPermissions?.[`ta-permission`] === true) &&
							<h3>
								<Link to={`/manager`}>
									<Button variant='primary' className='button'>
										Manage Collections
									</Button>
								</Link>
							</h3>
						}
						</Col>
						<Col xs="1"></Col>
					</Row>
				</Container>
				{/* </div> */}
			</header>
			<Container>
				<Row>
					<Col xs="1"></Col>
					<Col>
							{ Object.keys(collections).length > 0 ? (
								<>
									{ isMobile ?
										Object.keys(collections).map(key =>
											<Accordion>
												<ListCollectionContainer key={key} collection={collections[key]} />
											</Accordion>)
										:
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
					</Col>
					<Col xs="1"></Col>
				</Row>
			</Container>


			{ !isMobile ?
				<>
					{
						user !== null && (user.roles < 3 || hasCollectionPermissions?.[`ta-permission`] === true) ?
						<header className= 'collections-header'>
						<Container className="subheader">
							<Row className="mt-5"></Row>
							<Row width="50%"  className='justify-content-center align-items-center mb-4'>
								<Col xs="1"></Col>
								<Col className = "text-left" >
									<div>
										<h3>Public Collections &nbsp;&nbsp;&nbsp; </h3>
									</div>
								</Col>
								<Col className="text-center">
									<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSearchQuerySubmit}>
										<SearchIcon />
										<input id='resource-search-input' type='search' placeholder={`Search public collections`} onChange={handleSearchTextChange} value={searchQuery} />
									</Search>
								</Col>
									<Col className="text-right">
										{ !isMobile &&
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
										}
										{
											user.roles === 0 &&
												<h3>
													<Link to={`/public-manager`}>
														<Button variant='primary' className='button'>
															Manage Public Collections
														</Button>
													</Link>
												</h3>
										}
									</Col>
									<Col xs="1"></Col>
							</Row>
						</Container>
						</header>
						:
						<Container className='subheader2'>
							<Row>
								<header className= 'collections-header-not-admin'>
									<Col>
										<div>
											<h3>Public Collections &nbsp;&nbsp;&nbsp; </h3>
										</div>
										<div>
										</div>
										<Search className='resource-search-submit-not-admin' id='searchSubmit' onSubmit={handleSearchQuerySubmit}>
											<SearchIcon />
											<input id='resource-search-input' type='search' placeholder={`Search public collections`} onChange={handleSearchTextChange} value={searchQuery} />
										</Search>
									</Col>
									{ !isMobile &&
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
									}
									{
										user.roles === 0 &&
										<Col>
											<h3><Link to={`/public-manager`}>Manage Public Collections</Link></h3>
										</Col>
									}
								</header>
							</Row>
						</Container>
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
			<Container>
				<Row>
					<Col xs="1"></Col>
					<Col>
					{
						Object.keys(publicCollections).length > 0 ?
							<>
								{ isMobile ?
									Object.keys(publicCollections).map(key =>
										<ListCollectionContainer
											key={key}
											identifier={key}
											collection={publicCollections[key]}
											handleSetSubscribedObj={handleSetSubscribedObj}
											defaultSubscription={subscribedObj[key].isSubscribed}
										/>)
									:
									publicDisplayBlocks ?
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
				</Col>
				<Col xs="1"></Col>
				</Row>
			</Container>
		</Style>
	)
}

export default Collections
