import React from 'react'

import { Form, AddManyForm, AddManyButton, CancelButton } from './styles'

const AddBatchNetids = props => {

	const { id , disabledUser } = props.viewstate
	const { handleNewId, handleIdChange, toggleModal } = props.handlers

	return (
		<Form onSubmit={ handleNewId }>
			<h3>Paste a list of netids, one per line.</h3>
			<br/>
			<AddManyForm >
				<textarea className='textarea' type='text' value={id} onChange={ e => handleIdChange(e.target.value) } />
			</AddManyForm>
			<br/>
			<div>
				<CancelButton className='std-outline-color' type='button' onClick={e => toggleModal()}>Cancel</CancelButton>
				<AddManyButton className='std-outline-color' type='submit' color={`#0582CA`} disabled={disabledUser} >Add Many</AddManyButton>
			</div>
		</Form>
	)
}

export default AddBatchNetids
