import React, { PureComponent } from 'react'

import { LabAssistantTable } from 'components/bits'

import Style, { Search, SearchIcon } from './styles'

export class LabAssistant extends PureComponent {
	render() {

		const {
			data,
			placeholder,
			searchQuery,
			showResource,
		} = this.props.viewstate

		const {
			updateSearchBar,
			handleSubmit,
			handleShowResource,
		} = this.props.handlers

		return (
			<Style>
				{/* <h1>Lab Assistant Dashboard</h1> */}
				<h1></h1>
				<Search onSubmit={handleSubmit}>
					<SearchIcon />
					<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery} />
					<button type='submit'>Search</button>
				</Search>
				<LabAssistantTable data={data} show={showResource} handleShowResource={handleShowResource}/>
			</Style>
		)
	}
}

export default LabAssistant
