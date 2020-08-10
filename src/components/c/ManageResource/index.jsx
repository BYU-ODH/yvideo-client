import React, { PureComponent } from 'react'

import Style, {Button, Search, SearchIcon} from './styles'

import ResourceOverviewContainer from '../../../containers/c/ResourceOverviewContainer'

export class ManageResource extends PureComponent {

	render() {
		const {
			user,
			searchQuery,
			resources,
		} = this.props.viewstate

		const {
			addResource,
			handleSearchTextChange,
		} = this.props.handlers

		return (
			<Style>
				<header>
					<div>
						<h2>Manage Resources</h2>
					</div>
					<div>
						<Button onClick={addResource}>Create Resource</Button>
					</div>
				</header>

				<Search >
					<SearchIcon />
					<input type='search' placeholder={`search resources`} onChange={handleSearchTextChange} value={searchQuery} />
				</Search>

				<div>
					{Object.keys(resources).map(index => <ResourceOverviewContainer key={resources[index].id} resource={resources[index]} />)}
				</div>
			</Style>
		)
	}
}

export default ManageResource
