import React, { PureComponent } from 'react'

import { Form, AddManyForm, AddManyButton, CancelButton } from './styles'

export default class AddBatchNetids extends PureComponent {

	render() {
		const { id , disabledUser} = this.props.viewState
		const { handleNewId, handleIdChange, toggleModal } = this.props.handler

		return (
			<Form onSubmit={ handleNewId }>
				{/* <h1>Add Many</h1><br/> */}
				<h3>Paste a list of netids, one per line.</h3>
				<br/>
				<AddManyForm >
					<textarea className='textarea' type='text' value={id} onChange={ e => handleIdChange(e.target.value) } />
				</AddManyForm>
				<br/>
				<div>
					<CancelButton type='button' onClick={e => toggleModal()}>Cancel</CancelButton>
					<AddManyButton type='submit' color={`#0582CA`} disabled={disabledUser} >Add Many</AddManyButton>
				</div>
			</Form>
		)
	}
}
