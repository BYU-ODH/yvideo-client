import React, { PureComponent } from 'react'

import { ConfirmDeleteBox, ConfirmBox, ConfirmButton, Logo } from './styles'

export default class ConfirmDelete extends PureComponent {

	render() {
		const category = (searchCategory) => {
			if(searchCategory === 'Users' || searchCategory === 'Collections'){
				return searchCategory.substring(0, searchCategory.length - 1).toLowerCase()
			}
			else {
				return searchCategory.toLowerCase()
			}
		}

		const { searchCategory } = this.props
		const { toggleModal, deleteConfirmed } = this.props.handlers

		return (
			<>
				{
					<ConfirmDeleteBox>
						<ConfirmBox>
							<div>
								<Logo></Logo><p>Delete {category(searchCategory)}?</p>
							</div>
							<p>Are you sure you want to delete this {category(searchCategory)}?<br/>Once deleted it cannot be recovered</p>
							<div>
									<button onClick={toggleModal}>Cancel</button>
									<ConfirmButton onClick={deleteConfirmed}>Delete</ConfirmButton>
							</div>
						</ConfirmBox>
					</ConfirmDeleteBox>
				}
			</>
		)
	}
}
