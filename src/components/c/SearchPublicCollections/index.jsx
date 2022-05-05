import React, { PureComponent } from 'react'

import {
	PublicListCollectionContainer,
} from 'containers'

import Style, {Search, SearchIcon, ListLable, FeedbackMessage} from './styles'

export default class SearchPublicCollections extends PureComponent {

	render() {

		const {
			searchQuery,
			searchedPublicCollections,
			isSearched,
		} = this.props.viewstate

		const {
			handleSubmit,
			handleSearchTextChange,
			setNoCollections,
		} = this.props.handlers

		return (
			<Style>
				<header>
					<div>
						{/* <h2>Search Public Collections</h2> */}
					</div>
				</header>

				<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSubmit}>
					<SearchIcon />
					<input id='resource-search-input' type='search' placeholder={`search public collections`} onChange={handleSearchTextChange} value={searchQuery} />
					<button type='submit'>Search</button>
				</Search>

				<div className='list-public-collections'>
					{ Object.keys(searchedPublicCollections).length > 0 && isSearched?
						<>
							<ListLable>Search Results</ListLable>
							{Object.keys(searchedPublicCollections).map(key =>
								<PublicListCollectionContainer key={key} collection={searchedPublicCollections[key]}/>
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
}