import React, { PureComponent } from 'react'

import {
	ConfirmDeleteBox,
	ConfirmBox,
	ConfirmButton,
	Logo,
} from './styles'

export default class DeleteConfirm extends PureComponent {

	render() {

		const {
			title,
			type,
		} = this.props.viewstate

		const {
			handleRemoveItem,
			toggleModal,
		} = this.props.handlers

		return (
			<>
				{
					<ConfirmDeleteBox>
						<ConfirmBox>
							<div>
								<Logo></Logo><p>Delete {type}?</p>
							</div>
							<p>Are you sure you want to delete '{title}'?<br/>Once deleted it cannot be recovered.</p>
							<div>
								<button onClick={toggleModal}>Cancel</button>
								<ConfirmButton onClick={handleRemoveItem}>Delete</ConfirmButton>
							</div>
						</ConfirmBox>
					</ConfirmDeleteBox>
				}
			</>
		)
	}
}
