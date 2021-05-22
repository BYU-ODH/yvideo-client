import React, { PureComponent } from 'react'

import {
	PublicListCollectionContainer,
} from 'containers'

import Style, {Search, SearchIcon, ListLable} from './styles'

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
						<h2>Search Public Collections</h2>
					</div>
				</header>

				<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSubmit}>
					<SearchIcon />
					<input className='resource-search-input' type='search' placeholder={`search public collections`} onChange={handleSearchTextChange} value={searchQuery} />
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
						:<h4>No collections matched your search</h4>
					}
				</div>
			</Style>
		)
	}
}