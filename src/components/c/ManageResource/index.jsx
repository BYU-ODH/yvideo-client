import React from 'react'

import Style, {Button, Search, SearchIcon, PlusIcon, FeedbackMessage, Help} from './styles'

import ResourceOverviewContainer from '../../../containers/c/ResourceOverviewContainer'

import helpIcon from 'assets/manage-collection-help-circle.svg'

const ManageResource = props => {

	const {
		searchQuery,
		resources,
		isMobile,
		isSearched,
	} = props.viewstate

	const {
		addResource,
		handleSearchTextChange,
		handleSubmit,
		handleShowHelp,
		handleShowTip,
		toggleTip,
	} = props.handlers

	return (
		<Style>
			<div className='add-resource-button'>
				<Button className='std-outline-color' onClick={addResource}><PlusIcon/>Resource</Button>
			</div>

			<div className='resource-search'>

				<Search id='searchSubmit' className='std-outline-color' onSubmit={handleSubmit} isMobile={isMobile}>
					<Help style={{ position: `relative` }}>
						<img src={helpIcon}
							alt={`help`}
							onClick={handleShowHelp}
							onMouseEnter={e => handleShowTip(`help`,
								{
									x: e.target.getBoundingClientRect().x,
									y: e.target.getBoundingClientRect().y,
									width: e.currentTarget.offsetWidth,
								})
							}
							onMouseLeave={() => toggleTip()}
						/>
					</Help>
					<SearchIcon />
					<input id='resource-search-input' className='std-outline-color' type='search' placeholder={`search resources`} onChange={handleSearchTextChange} value={searchQuery} />
					<button className='std-outline-color' type='submit'>Search</button>
				</Search>

				<div>
					{Object.keys(resources).map(index => <ResourceOverviewContainer key={resources[index].id} resource={resources[index]} />)}

					{isSearched && Object.keys(resources).length === 0 ?
						<FeedbackMessage><p>No resources matched your search</p></FeedbackMessage>
						:
						<></>}
				</div>
			</div>

		</Style>
	)
}

export default ManageResource
