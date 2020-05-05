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
		} = this.props.viewstate

		const {
			updateCategory,
			updateSearchBar,
			handleSubmit,
		} = this.props.handlers

		return (
			<Style>
				<h1>Admin Dashboard</h1>

				<div>

					<CategorySelect onChange={updateCategory}>
						{Object.keys(category).map((c, index) =>
							<option value={category[c].name} key={index}>
								{category[c].name}
							</option>,
						)}
					</CategorySelect>

					<Search onSubmit={handleSubmit}>
						<SearchIcon />
						<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery}/>
					</Search>

				</div>
				{ data !== null ? (
					<>
						{ data.length < 1 ? (<FeedbackMessage><p>The are no results</p></FeedbackMessage>) : (<AdminTable category={searchCategory} data={data} />)}
					</>
				) : (<FeedbackMessage><p></p></FeedbackMessage>) }

			</Style>
		)
	}
}

export default Admin
