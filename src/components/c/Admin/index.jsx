import React, { PureComponent } from 'react'

import { AdminTable } from 'components/bits'

import Style, { Search, SearchIcon, FeedbackMessage, CategorySelect } from './styles'

export class Admin extends PureComponent {
	render() {

		const {
			category,
			data,
			searchQuery,
			searchCategory,
			menuActive,
			menuItemInfo,
			mousePos,
			placeholder,
		} = this.props.viewstate

		const {
			updateSearchBar,
			handleSubmit,
			toggleMenu,
			handleConfirmDelete,
			updateCategory,
		} = this.props.handlers

		return (
			<Style>
				<h1>Admin Dashboard</h1>

				<div>

					{/* WE ARE ONLY SEARCHING FOR USERS NOW SO WE DO NOT NEED THE SELECT DROP DOWN */}
					<CategorySelect id='categorySelect' onChange={updateCategory}>
						{Object.keys(category).map((c, index) => (
							<option value={category[c].name} key={index}>
								{category[c].name}
							</option>
						))}
					</CategorySelect>
					<Search id='searchSubmit' onSubmit={handleSubmit}>
						<SearchIcon />
						<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery}/>
						<button type="submit">Search</button>
					</Search>

				</div>

				{ data !== null ?
					data.length < 1 ?
						<FeedbackMessage><p>The are no results</p></FeedbackMessage>
						:
						<AdminTable viewstate={this.props.viewstate} handlers={this.props.handlers} tipHandlers={this.props.tipHandlers}/>
					:
					<FeedbackMessage><p></p></FeedbackMessage>
				}

			</Style>
		)
	}
}

export default Admin
