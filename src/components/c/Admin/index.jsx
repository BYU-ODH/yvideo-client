import React, { PureComponent } from 'react'

import { AdminTable } from 'components/bits'

import { Container, Search, SearchIcon, CategorySelect } from './styles'

export class Admin extends PureComponent {
	render() {

		const {
			category,
			data,
			headers,
			placeholder,
		} = this.props.viewstate

		const {
			updateCategory,
			updateSearchBar,
		} = this.props.handlers

		return (
			<Container>
				<CategorySelect onChange={updateCategory}>
					{Object.keys(category).map((c, index) =>
						<option value={category[c].name} key={index}>
							{category[c].name}
						</option>
					)}
				</CategorySelect>
				<Search>
					<SearchIcon />
					<input type='search' placeholder={placeholder} onChange={updateSearchBar} />
				</Search>
				<AdminTable headers={headers} data={data} />
			</Container>
		)
	}
}

export default Admin
