import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	Search,
	SearchIcon,
	RemoveIcon,
	Table,
	RegisteredListTable,
	InputForm,
	AddButton,
	RemoveButton,
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

				{/*

				Keep the search method for later

				<h2>Register Instructors</h2>
				<Search id='searchSubmit'>
					<SearchIcon />
					<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery}/>
					<button type='submit' onClick={handleSearchSubmit}>Search</button>
				</Search> */}

				{/* { data !== null ?
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
				} */}

				<h2>Instructors</h2>

				<InputForm className='faculty-submit'>
					<input className='faculty-input' type='search' placeholder={`Enter netID or name`} onChange={updateSearchBar} value={searchQuery} />
					<AddButton onClick={addInstructor} type='submit'>Add</AddButton>
				</InputForm>
				{
					resourceAccess.length > 0 ?
						<RegisteredListTable>
							<thead>
							</thead>
							<tbody>
								{resourceAccess.map(
									item =>
										<tr key={item}>
											<td>{item}</td>
											<td></td>
											<td></td>
											<td><RemoveButton onClick={e => removeInstructor(item)}><RemoveIcon/></RemoveButton></td>
										</tr>,
								)}
							</tbody>
						</RegisteredListTable>
						:
						<>There is no registered user</>
				}

				<div>
					<Button type='button' onClick={toggleModal}>Cancel</Button>
					<Button type='submit' onClick={toggleModal} color={`#0582CA`}>Save</Button>
				</div>
			</Form>
		)
	}
}
