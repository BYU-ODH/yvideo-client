import React, { PureComponent } from 'react'

import {
	ConfirmDeleteBox,
	ConfirmBox,
	ConfirmButton,
} from './styles'

export default class ConfirmDeleteResource extends PureComponent {

	render() {

		const {
			resourceId,
		} = this.props.viewstate

		const {
			handleRemoveResource,
			toggleModal,
		} = this.props.handlers

		return (
			<>
				{
					<ConfirmDeleteBox>
						<ConfirmBox>
							<p>Are you sure you want to delete this {resourceId}?<br/>Once deleted it cannot be recovered</p>
							<div>
								<button onClick={toggleModal}>Cancel</button>
								<ConfirmButton onClick={handleRemoveResource}>Delete</ConfirmButton>
							</div>
						</ConfirmBox>
					</ConfirmDeleteBox>
				}
			</>
		)
	}
}
