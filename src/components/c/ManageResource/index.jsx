import React, { PureComponent } from 'react'

import Style, {Button, Search, SearchIcon, PlusIcon} from './styles'

import ResourceOverviewContainer from '../../../containers/c/ResourceOverviewContainer'

export class ManageResource extends PureComponent {

	render() {
		const {
			user,
			searchQuery,
			resources,
			isMobile,
		} = this.props.viewstate

		const {
			addResource,
			handleSearchTextChange,
			handleSubmit,
		} = this.props.handlers

		return (
			<Style>
				<header>
					<div>
						{/* <h2>Manage Resources</h2> */}
					</div>
					<div>
						<Button onClick={addResource}><PlusIcon/>Compose</Button>
					</div>
				</header>

				<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSubmit} isMobile={isMobile}>
					<SearchIcon />
					<input className='resource-search-input' type='search' placeholder={`search resources`} onChange={handleSearchTextChange} value={searchQuery} />
					<button type='submit'>Search</button>
				</Search>

				<div>
					{Object.keys(resources).map(index => <ResourceOverviewContainer key={resources[index].id} resource={resources[index]} />)}
				</div>
			</Style>
		)
	}
}

export default ManageResource
