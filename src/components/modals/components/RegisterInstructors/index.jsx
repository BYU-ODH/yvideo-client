import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	Search,
	SearchIcon,
	Table,
} from './styles'

export default class FileUpload extends PureComponent {

	render() {

		const {
			searchQuery,
			data,
		} = this.props.viewstate

		const {
			handleRegister,
			handleSearchSubmit,
			placeholder,
			updateSearchBar,
			toggleModal,
		} = this.props.handlers

		return (
			<Form onSubmit={handleRegister} id='upload-file-form'>
				<h2>Register Instructors</h2>

				<Search id='searchSubmit'>
					<SearchIcon />
					<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery}/>
					<button type='submit' onClick={handleSearchSubmit}>Search</button>
				</Search>

				{ data !== null ?
					<Table>
						<thead>
							<tr>
								<td>NetID</td>
								<td>Name</td>
								<td>type</td>
								<td>email</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							{data.map(
								item =>
									<tr key={item.id}>
										<td>{item.username}</td>
										<td>{item.name}</td>
										<td>{item.roles}</td>
										<td>{item.email}</td>
										<td><Button color={`#0582CA`}>add</Button></td>
									</tr>,
							)}
						</tbody>
					</Table>
					:
					<></>
				}

				<div>
					<Button type='button' onClick={toggleModal}>Cancel</Button>
					<Button type='submit' color={`#0582CA`}>Save</Button>
				</div>
			</Form>
		)
	}
}
