import React, { PureComponent } from 'react'

import { AdminTable } from 'components/bits'

import Style, { Search, SearchIcon, CategorySelect, FeedbackMessage } from './styles'

export class Admin extends PureComponent {
	render() {

		const {
			category,
			data,
			placeholder,
			searchQuery,
			searchCategory,
			menuId,
			menuActive,
			mousePos,
		} = this.props.viewstate

		const {
			updateCategory,
			updateSearchBar,
			handleSubmit,
			toggleMenu,
			handleConfirmDelete,
		} = this.props.handlers

		const viewstate = {
			searchCategory,
			menuId,
			menuActive,
			category,
			data,
			mousePos,
		}

		const handlers = {
			handleConfirmDelete,
			toggleMenu,
		}

		return (
			<Style>
				<h1>Admin Dashboard</h1>

				<div>

					<CategorySelect onChange={updateCategory}>
						{Object.keys(category).map((c, index) => (
							<option value={category[c].name} key={index}>
								{category[c].name}
							</option>
						))}
					</CategorySelect>

					<Search onSubmit={handleSubmit}>
						<SearchIcon />
						<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery}/>
					</Search>

				</div>

				{ data !== null ?
					data.length < 1 ?
						<FeedbackMessage><p>The are no results</p></FeedbackMessage>
						:
						<AdminTable viewstate={viewstate} handlers={handlers}/>
					:
					<FeedbackMessage><p></p></FeedbackMessage>
				}

			</Style>
		)
	}
}

export default Admin
