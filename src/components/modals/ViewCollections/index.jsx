import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Style, { StyledDiv, Plus } from './styles'
import { interfaceService } from 'services'

class ViewCollections extends PureComponent {

	render() {

		const {
			data,
			user,
			toggleViewCollectionsModal,
		} = this.props

		if(data === null) return null

		const collections = data.filter(item => item.owner === user.id)

		return (
			<Style>
				<h4>Collections</h4>

				{collections.map(({ id, name }, index) => <Link key={index} to={{ pathname: `/lab-manager/${id}`, user }} onClick={toggleViewCollectionsModal}>{name}</Link>)}

				<Link to={{ pathname: `/lab-manager`, createCollection: true, user }} onClick={toggleViewCollectionsModal}><StyledDiv><Plus />Create New Collection</StyledDiv></Link>

				{/* TODO: This will work, but the data in the LabAssistantContainer is gone, so it causes problems
				<Button type='button' onClick={toggleViewCollectionsModal}>Cancel</Button>*/}
			</Style>
		)
	}
}

const mapStateToProps = store => ({
	data: store.adminStore.data,
	user: store.interfaceStore.modal.user,
})

const mapDispatchToProps = {
	toggleViewCollectionsModal: interfaceService.toggleViewCollectionsModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCollections)