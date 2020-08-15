import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import HelpDocumentation from '../components/HelpDocumentation'

import {
	// adminService,
	interfaceService
} from 'services'

/**
This component takes one parameter. The parameter is the @param name of the component that we need help with.
Help documentation is available as an object. Each key will be the name of a component and each name will point to specific information and resources
which will provide the necessary help to the user. Resources can be a video, an image, or maybe a detailed tutorial

To open up the modal you can import the question mark icon from the assets folder:
-> @path =>> import helpIcon from 'assets/manage-collection-help-circle.svg'


to show the modal you need to import the modal from
--> @path =>> import HelpDocumentation from 'components/modals/containers/HelpDocumentationContainer'
to the component where you are and then add the following code:

const handleShowHelp = () => {
		toggleModal({
			component: HelpDocumentation,
			props: { name: 'Home Page'},
		})
	}

pass this code as a handler and then pass that to the onClick even of the icon that you imported
To see this you can go to the manager container and see how we used it there.

FOR NOW THE HELP DOCUMENTATION IS ONLY A STRING THAT GETS INSERTED INTO AN HTML NODE.

MAYBE IN THE FUTURE WE CAN CREATE SMALL HELP COMPONENTS AND SHOW THOSE COMPONENTS INSTEAD OF A SIMPLE HTML STRING

**/


const HelpDocumentationContainer = props => {

	const {
		name,
		toggleModal
	} = props

	const index = {
		'Manage Collections': {
			htmlInstruction: `
				<div style="font-size: 1.5rem; padding: 20px;">
					<p><b>Collections:</b> To manage your collections you are going to use the left side menu of the screen which lists all your current collections. You can create new
						collections by clicking "Create New Collection". The new collection will then be added as an unpublished collection, so students can't see it.</p><br/>
					<p><b>Managing a collection:</b> When you click on a collection name, you will see on the right a collection menu where you can edit the collection name, see "Content" "Permissions", and where you can publish/unpublish
						and archive/unarchive a collection. </p><br/>
					<p><b>Managing content:</b> Each collection will display a list of content. Each content will show the name, subtitles icon, language icon, a link to edit content, and a link to edit the video.
					 	You can edit the content by clicking the edit button. If you want to edit the video for a class, you can click on the "TrackEditor".</p><br/>
				</div>`,
			images: '',
			videos: '',
		},
		'Home Page': {
			htmlInstruction: '',
			images: '',
			videos: '',
		},
		'Track Editor': {
			htmlInstruction: '',
			images: '',
			videos: '',
		}
	}

	const viewstate = {
		name,
		help: index[name],
	}

	return <HelpDocumentation viewstate={viewstate} toggleModal={toggleModal}/>
}

const mapStateToProps = store => ({
	// admin: store.authStore.user.roles === 0,
	// adminContent: store.adminStore.data,
})

const mapDispatchToProps = {
	// search: adminService.search,
	// adminDeleteCollection: adminService.deleteCollection,
	// adminDeleteUser: adminService.deleteUser,
	// adminDeleteContent: adminService.deleteContent,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpDocumentationContainer)