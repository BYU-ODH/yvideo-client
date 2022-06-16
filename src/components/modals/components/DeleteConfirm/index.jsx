import Style, { Button } from './styles'

import React, { Component } from 'react'

export default class DeleteConfirm extends Component {

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
					<Style>
						<div className={`delete-div`}>
							<h2>Are you sure you want to delete {type}: <u>{title}</u>? It cannot be recovered</h2>
							<div className={`delete-buttons`}>
								<Button className='url-content-cancel' type='button' onClick={toggleModal}>Cancel</Button>
								<Button className='url-content-delete' type='submit' onClick={handleRemoveItem}>Delete</Button>
							</div>
						</div>
					</Style>

				}
			</>
		)
	}
}
