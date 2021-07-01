import React, { PureComponent } from 'react'

import { AdminTable } from 'components/bits'

import Style, { Search, SearchIcon, FeedbackMessage, CategorySelect, Mobile, Button, PlusIcon } from './styles'

export class Admin extends PureComponent {
	render() {

		const {
			category,
			data,
			searchQuery,
			searchCategory,
			placeholder,
			isMobile,
		} = this.props.viewstate

		const {
			updateSearchBar,
			handleSubmit,
			updateCategory,
			addUsers,
		} = this.props.handlers

		return (
			<Style>
				{/* <h1>Admin Dashboard</h1> */}

				<div className='add-users-button'>
					<Button onClick={addUsers}><PlusIcon/>Users</Button>
				</div>

				<div className='admin-dashboard'>
					<Mobile isMobile={isMobile}>
						{/* WE ARE ONLY SEARCHING FOR USERS NOW SO WE DO NOT NEED THE SELECT DROP DOWN */}
						<CategorySelect id='categorySelect' onChange={updateCategory} isMobile={isMobile}>
							{Object.keys(category).map((c, index) => (
								<option value={category[c].name} key={index}>
									{category[c].name}
								</option>
							))}
						</CategorySelect>
						<Search id='searchSubmit' onSubmit={handleSubmit} isMobile={isMobile}>
							<SearchIcon isMobile={isMobile} />
							<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery}/>
							<button type='submit'>Search</button>
						</Search>
					</Mobile>

					{ data !== null ?
						data.length < 1 ?
							<FeedbackMessage><p>No {searchCategory.toLowerCase()} matched your search</p></FeedbackMessage>
							:
							<AdminTable viewstate={this.props.viewstate} handlers={this.props.handlers} tipHandlers={this.props.tipHandlers}/>
						:
						<FeedbackMessage><p></p></FeedbackMessage>
					}
				</div>

			</Style>
		)
	}
}

export default Admin
