import React from 'react'

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

const ManageInstrucors = props => {

	const {
		searchQuery,
		resourceAccess,
	} = props.viewstate

	const {
		handleRegister,
		updateSearchBar,
		toggleModal,
		addInstructor,
		removeInstructor,
	} = props.handlers

	return (
		<Div>
			<Form onSubmit={handleRegister} id='upload-file-form'>
				<Button className='std-outline-color' type='button' onClick={toggleModal}><p className='fa fa-times' aria-hidden='true'></p></Button>
				<h2>Instructors</h2>

				<InputForm className='faculty-submit'>
					<input className='faculty-input' type='search' placeholder={`Enter netID`} onChange={updateSearchBar} value={searchQuery} />
					<AddButton className='std-outline-color' onClick={addInstructor} type='submit'>Add</AddButton>
				</InputForm>
				<Hr />
				{
					resourceAccess.length > 0 ?
						<RegisteredListTable>
							<tbody className='tbody'>
								{resourceAccess.map(
									item =>
										<tr key={item.username}>
											<td>{item.username}</td>
											<td><RemoveButton onClick={e => removeInstructor(item.username)}><RemoveIcon/></RemoveButton></td>
										</tr>,
								)}
							</tbody>
						</RegisteredListTable>
						:
						<>There is no registered user</>
				}
			</Form>
		</Div>
	)
}

export default ManageInstrucors
