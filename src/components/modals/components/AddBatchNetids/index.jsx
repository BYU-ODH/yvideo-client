import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	RemoveKeyword,
	Table,
	TableContainer,
	Tabs,
	Tab,
	TypeButton,
	FormResource,
} from './styles'

import plus from 'assets/plus_blue.svg'

export default class AddBatchNetids extends PureComponent {

	render() {
		const { list, id } = this.props.viewState
		const { handleNewId, handleIdChange, toggleModal } = this.props.handler

		return (
			<div>
				<h1>Add Many</h1>
				<form onSubmit={ handleNewId } >
					<textarea type="text" rows="10" cols="20" value={id} onChange={ e => handleIdChange(e.target.value) } /><br />
					<button type="submit">Add Many</button>
					<button type="button" onClick={e => toggleModal()}>Cancel</button>
				</form>
			</div>
		)
	}
}
