import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	Search,
	SearchIcon,
	Table,
	RegisteredListTable,
} from './styles'

export default class ManageInstructors extends PureComponent {

	render() {

		const {
			searchQuery,
			data,
			resourceAccess,
		} = this.props.viewstate

		const {
			handleRegister,
			handleSearchSubmit,
			placeholder,
			updateSearchBar,
			toggleModal,
			addInstructor,
			removeInstructor,
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
								<td>email</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							{data.map(
								item =>
									item.roles === 0 ? (
										<tr key={item.id}>
											<td>{item.username}</td>
											<td>{item.name}</td>
											<td>{item.email}</td>
											{item.roles === 0 && !resourceAccess.includes(item.username)? (
												<td><Button onClick={e => addInstructor(item.username)} color={`#0582CA`}>add</Button></td>
											)
												: (
													<td><Button disabled={handleSearchSubmit === undefined} type='submit' color={`#A0A0A0`}>registered</Button></td>
												)
											}
										</tr>)
										:
										null,
							)}
						</tbody>
					</Table>
					:
					<></>
				}

				<h2>Registered</h2>
				{
					resourceAccess.length > 0 ?
						<RegisteredListTable>
							<thead>
								<tr>
									<td>NetID</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</thead>
							<tbody>
								{resourceAccess.map(
									item =>
										<tr key={item}>
											<td>{item}</td>
											<td></td>
											<td></td>
											<td><Button onClick={e => removeInstructor(item)} color={`#0582CA`}>remove</Button></td>
										</tr>,
								)}
							</tbody>
						</RegisteredListTable>
						:
						<></>
				}

				<div>
					<Button type='button' onClick={toggleModal}>Cancel</Button>
					<Button type='submit' onClick={toggleModal} color={`#0582CA`}>Save</Button>
				</div>
			</Form>
		)
	}
}
