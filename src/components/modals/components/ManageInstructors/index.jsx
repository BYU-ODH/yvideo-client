import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	RemoveIcon,
	RegisteredListTable,
	InputForm,
	Hr,
	Div,
	AddButton,
	RemoveButton,
} from './styles'

export default class ManageInstructors extends PureComponent {

	render() {

		const {
			searchQuery,
			resourceAccess,
		} = this.props.viewstate

		const {
			handleRegister,
			updateSearchBar,
			toggleModal,
			addInstructor,
			removeInstructor,
		} = this.props.handlers

		return (
			<Form className="std-outline-color" onSubmit={handleRegister} id='upload-file-form'>

				<h2>Instructors</h2>

				<InputForm className='faculty-submit'>
					<input className='faculty-input' type='search' placeholder={`Enter netID or name`} onChange={updateSearchBar} value={searchQuery} />
					<AddButton className="std-outline-color" onClick={addInstructor} type='submit'>Add</AddButton>
				</InputForm>
				{
					resourceAccess.length > 0 ?
						<RegisteredListTable>
							<thead>
							</thead>
							<tbody>
								{resourceAccess.map(
									item =>
										<tr key={item.username}>
											<td>{item.username}</td>
											<td></td>
											<td></td>
											<td><RemoveButton onClick={e => removeInstructor(item.username)}><RemoveIcon /></RemoveButton></td>
										</tr>,
								)}
							</tbody>
						</RegisteredListTable>
						:
						<div><b>There is no registered user</b></div>
				}

				<div>
					<Button type='button' onClick={toggleModal}>Cancel</Button>
					<Button type='submit' onClick={toggleModal} color={`#0582CA`}>Save</Button>
				</div>
			</Form>

		)
	}
}
