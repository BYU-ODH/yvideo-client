import React, { PureComponent } from 'react'

import Style, {Button, Search, SearchIcon, PlusIcon, FeedbackMessage, Help} from './styles'

import ResourceOverviewContainer from '../../../containers/c/ResourceOverviewContainer'

import helpIcon from 'assets/manage-collection-help-circle.svg'

export class ManageResource extends PureComponent {

	render() {
		const {
			user,
			searchQuery,
			resources,
			isMobile,
			isSearched,
		} = this.props.viewstate

		const {
			addResource,
			handleSearchTextChange,
			handleSubmit,
			handleShowHelp,
		} = this.props.handlers

		return (
			<Style>
				<div className='add-resource-button'>
					<Button onClick={addResource}><PlusIcon/>Resource</Button>
				</div>

				<div className='resource-search'>
					<Help style={{ position: 'relative' }}>
						<img src={helpIcon} onClick={handleShowHelp}/>
					</Help>

					<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSubmit} isMobile={isMobile}>
						<SearchIcon />
						<input className='resource-search-input' type='search' placeholder={`search resources`} onChange={handleSearchTextChange} value={searchQuery} />
						<button type='submit'>Search</button>
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
}

export default ManageResource
