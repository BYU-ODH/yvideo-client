import React, { PureComponent } from 'react'

import Style, {Button, Search, SearchIcon, PlusIcon, FeedbackMessage, Help} from './styles'

import ResourceOverviewContainer from '../../../containers/c/ResourceOverviewContainer'

import helpIcon from 'assets/manage-collection-help-circle.svg'

export class ManageResource extends PureComponent {

	render() {
		const {
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
			handleShowTip,
			toggleTip,
		} = this.props.handlers

		return (
			<Style>
				<div className='add-resource-button'>
					<Button className='std-outline-color' onClick={addResource}><PlusIcon/>Resource</Button>
				</div>

				<div className='resource-search'>
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
							onMouseLeave={e => toggleTip()}
						/>
					</Help>

					<Search id='searchSubmit' className='std-outline-color' onSubmit={handleSubmit} isMobile={isMobile}>
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
}

export default ManageResource
