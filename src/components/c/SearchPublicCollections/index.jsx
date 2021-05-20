import React, { PureComponent } from 'react'

import {
	PublicListCollectionContainer,
} from 'containers'

import Style, {Search, SearchIcon} from './styles'

export default class SearchPublicCollections extends PureComponent {

	render() {

		const {
			searchedCount,
			searchQuery,
			publicCollections,
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

				<div className='list'>
					{ Object.keys(publicCollections).length > 0 || Object.keys(searchedPublicCollections).length > 0 ? (
						<>
							{ searchedCount === 0 ?
								// public collections the user own
								Object.keys(publicCollections).map(key =>
									<PublicListCollectionContainer key={key} collection={publicCollections[key]}/>,
								):
								<>
									{
										Object.keys(searchedPublicCollections).map(key =>
											<PublicListCollectionContainer key={key} collection={searchedPublicCollections[key]} content={searchedPublicCollections[key].content}/>
											,
										)
									}

								</>
							}
						</>
					) : (
						<>
							<h1 id='message'>Loading</h1>
							{ setNoCollections() }
							<div>Nothing is found from "{searchQuery}"</div>
						</>
					) }
				</div>
			</Style>
		)
	}
}