import React, { PureComponent } from 'react'

import { LabAssistantTable } from 'components/bits'

import Style, { Search, SearchIcon, Category } from './styles'

export class LabAssistant extends PureComponent {
	render() {

		const {
			data,
			placeholder,
			searchCategory,
			searchQuery,
		} = this.props.viewstate

		const {
			updateSearchBar,
			handleSubmit,
			viewCollections,
		} = this.props.handlers

		return (
			<Style>
				<h1>Lab Assistant Dashboard</h1>

				<div>

					<Category >
						{searchCategory}
					</Category>

					<Search onSubmit={handleSubmit}>
						<SearchIcon />
						<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery} />
					</Search>

				</div>

				<LabAssistantTable data={data} viewCollections={viewCollections} />
			</Style>
		)
	}
}

export default LabAssistant
