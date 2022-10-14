import React from 'react'

import { AdminTable } from 'components/bits'

import Style, { Search, SearchIcon, FeedbackMessage, CategorySelect, Mobile, Button, PlusIcon } from './styles'

const Admin = props => {

	const {
		category,
		data,
		searchQuery,
		searchCategory,
		placeholder,
		isMobile,
	} = props.viewstate

	const {
		updateSearchBar,
		handleSubmit,
		updateCategory,
		addUsers,
	} = props.handlers

	return (
		<Style>
			<div className='add-users-button'>
				<Button className='std-outline-color' onClick={addUsers}><PlusIcon/>Users</Button>
			</div>

			<div className='admin-dashboard'>
				<Mobile isMobile={isMobile}>
					{/* WE ARE ONLY SEARCHING FOR USERS NOW SO WE DO NOT NEED THE SELECT DROP DOWN */}
					<CategorySelect className='std-outline-color' id='categorySelect' onChange={updateCategory} isMobile={isMobile}>
						{Object.keys(category).map((c, index) => (
							<option value={category[c].name} key={index}>
								{category[c].name}
							</option>
						))}
					</CategorySelect>
					<Search className='std-outline-color' id='searchSubmit' onSubmit={handleSubmit} isMobile={isMobile}>
						<SearchIcon isMobile={isMobile} />
						<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery}/>
						<button className='std-outline-color' type='submit'>Search</button>
					</Search>
				</Mobile>

				{ data !== null ?
					data.length < 1 ?
						<FeedbackMessage><p>No {searchCategory.toLowerCase()} matched your search</p></FeedbackMessage>
						:
						<AdminTable viewstate={props.viewstate} handlers={props.handlers} tipHandlers={props.tipHandlers}/>
					:
					<FeedbackMessage><p></p></FeedbackMessage>
				}
			</div>

		</Style>
	)
}

export default Admin
