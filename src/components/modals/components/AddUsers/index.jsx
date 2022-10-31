import React from 'react'

import {
	Form,
	CloseButton,
	AddManyForm,
	SubmitButton,
} from './styles'

const AddUsers = props => {

	const {
		usernames,
		addedUsersResult,
		isSubmitted,
	} = props.viewstate

	const {
		handleSubmit,
		handleIdChange,
		handleClose,
	} = props.handlers

	// TODO: search list all the resources related to the email
	return (
		<Form onSubmit={ handleSubmit } data-testid= 'form'>
			{!isSubmitted &&<h3>Paste a list of usernames, one per line.</h3>}
			<br/>
			<AddManyForm >
				<textarea data-testid='success-text-area' className='textarea std-outline-color' type='text' value={usernames} onChange={handleIdChange} />
				{
					addedUsersResult?.failResult?.length > 0 ?
						<textarea className='submit-result' readOnly={true} value={`Failed\n${addedUsersResult.failResult}`}/>
						:
						<></>
				}
			</AddManyForm>
			<br/>

			{addedUsersResult?.successResult && addedUsersResult?.failResult ?
				<>
					<h4>Request successfully submitted</h4>
					<h4>{addedUsersResult.successResult.length} successful out of {addedUsersResult.successResult.length + addedUsersResult.failResult.length}</h4>
				</>
				:
				<></>
			}
			<br/>

			<div>
				<CloseButton className='std-outline-color' type='button' onClick={handleClose}>Close</CloseButton>
				<SubmitButton className='std-outline-color' type='submit' color={`#0582CA`} disabled={isSubmitted} >Submit</SubmitButton>
			</div>

		</Form>
	)
}

export default AddUsers
