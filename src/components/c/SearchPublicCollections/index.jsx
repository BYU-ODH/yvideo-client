import React from 'react'

import {
	ListCollectionContainer,
} from 'containers'

import Style, { Search, SearchIcon, ListLable, FeedbackMessage } from './styles'

const SearchPublicCollections = props => {

	const {
		searchQuery,
		searchedPublicCollections,
		isSearched,
		subscribedObj,
	} = props.viewstate

	const {
		handleSubmit,
		handleSearchTextChange,
	} = props.handlers

	return (
		<Style>
			<header>
				<div>
				</div>
			</header>

			<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSubmit}>
				<SearchIcon />
				<input id='resource-search-input' type='search' placeholder={`Search public collections`} onChange={handleSearchTextChange} defaultValue={searchQuery} />
				<button type='submit'>Search</button>
			</Search>

			<div className='list-public-collections'>
				{ Object.keys(searchedPublicCollections).length > 0 && isSearched ?
					<>
						<ListLable>Search Results</ListLable>
						{Object.keys(searchedPublicCollections).filter(key => !Object.keys(subscribedObj).includes(key)).map(key =>
							<ListCollectionContainer key={key} identifier={key} collection={searchedPublicCollections[key]} defaultSubscription={false} />
							,
						)}
					</>
					:
					<>
						{isSearched ?
							<FeedbackMessage><p>No collections matched your search</p></FeedbackMessage>
							:
							<></>
						}
					</>
				}
			</div>
		</Style>
	)
}

export default SearchPublicCollections
