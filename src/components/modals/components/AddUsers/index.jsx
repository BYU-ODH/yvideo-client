import React, { PureComponent } from 'react'

import {
	Form,
	CloseButton,
	AddManyForm,
	SubmitButton,
} from './styles'

export default class AddUsers extends PureComponent {

	render() {

		const {
			usernames,
			addedUsersResult,
			isSubmitted,
		} = this.props.viewstate

		const {
			handleSubmit,
			handleIdChange,
			handleClose,
		} = this.props.handlers

		// TODO: search list all the resources related to the email
		return (
			<Form onSubmit={ handleSubmit }>
				{!isSubmitted && <h3>Paste a list of usernames, one per line.</h3>}
				<br/>
				<AddManyForm >
					<textarea className='textarea std-outline-color' type='text' value={usernames} onChange={ e => handleIdChange(e.target.value) } />
					{
						addedUsersResult.failResult && addedUsersResult.failResult.length > 0 ?
							<textarea className='submit-result' readOnly={true} value={`Failed\n${addedUsersResult.failResult}`}/>
							:
							<></>
					}
				</AddManyForm>
				<br/>

				{addedUsersResult && addedUsersResult.successResult && addedUsersResult.failResult ?
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
}
