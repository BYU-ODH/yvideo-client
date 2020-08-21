import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import HelpDocumentation from '../components/HelpDocumentation'

import menu from 'assets/help/help-menu.png'
import list from 'assets/list-view.svg'
import block from 'assets/block-view.svg'

import manager from 'assets/help/help-manager.png'

import collection from 'assets/help/help-collection.png'

import content from 'assets/help/help-content.png'
import eventHelp from 'assets/help/help-te-event.png'
import layerHelp from 'assets/help/help-te-layers.png'
import zoomrHelp from 'assets/help/help-te-zoom.png'

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
			props: { name: 'Page Name'},
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
				<div class="section">
					<p><b>Manager:</b> To manage your collections you are going to use the left side menu of the screen which lists all your current collections in three categories: <br/>
						<br/>- &nbsp;<b>Published</b> collections are the ones that students can see.
						<br/>- &nbsp;<b>Unpublished</b> collections are hidden from students.
						<br/>- &nbsp;<b>Archived</b> collections are the ones that you are not working on and students can't see them.
						<br/><br/>
						<b>Create New Collection:</b> this button allows you to create a new collection and add it as an unpublished collection, so students can't see it.
					</p><br/>
					<img src="${manager}" width="250px"/>
				</div>
				<hr/>
				<div class="section large-img">
					<p><b>Managing collections:</b> when you click on a collection name, you will see on the right a collection menu where you can edit the collection name, see "Content" or "Permissions",
						change status to publish/unpublish to show or hide collection from students, and archive/unarchive a collection.
					</p>
					<img src="${collection}">
				</div>
				<hr/>
				<div class="section large-img">
					<p><b>Managing content:</b> Each collection will display a list of content. Each content will show the name, subtitles icon, language icon, a link to edit content, and a link to edit the video.
						<br/>
					 	<b>Edit Content:</b> you can edit the content settings by clicking the edit button. This allows you to delete content, publish/unpublish a content even if the collection is visible to students, add a description,
						tags related to the video content, and activate subtiltes or definitions.
						<br/>
						<b>Edit Video:</b> if you want to edit events and subtitles for a video, you can click on the "TrackEditor".</p>
					<img src="${content}" />
				</div>`,
		},
		'Home Page': {
			htmlInstruction: `
				<div class="section">
					<p><b>Menu:</b><br/>The application main menu is located on the top right side of the screen. To open the menu you have to click on the icon which looks similar to the one in the
						photo on the right. As a student you will use the menu to log out of the application. As an instructor the menu will provide links to manage collections, and other functions.
					</p><br/>
					<img src="${menu}" width="100px"/>
				</div>
				<hr/>
				<div class="section">
					<p><b>Collections:</b><br/> Collections show available content for different classes. To play a video you just have to click on the video. Collections can be display in block view or list view.
						You can change the view by clicking the list or block icon on the top right.<br/>
						If you are an instructor, you can manage your collections by clicking on "Manage Collections" on the top right.
					</p><br/>
					<div style="margin: 10px;">
						<img src="${list}" width="30px" style="margin: 5px;"/>
						<img src="${block}" width="30px" style="margin: 5px;"/>
					</div>
				</div>`,
		},
		'Track Editor': {
			htmlInstruction: `
				<div class="section">
					<p><b>Side Menu:</b>
						<br/> -&nbsp; <b>Events:</b> all supported events are listed in blue on the right side on the screen. To add an event you need to drag it and drop it in the layer you want.
						<br/> -&nbsp; <b>Save:</b> after you made your changes to the video the last step is to save the video by clicking the save button. <b><i>If you do not save it you will lose
						all your changes</i></b>
					</p><br/>
					<img src="${eventHelp}" width="200px"/>
				</div>
				<hr/>
				<div class="section">
					<p><b>Layers:</b>
							<br/> -&nbsp; <b>Add Events:</b> drag an event from the right side menu and drop it in the desired layer. The event will be added at the beginning of the layer as default.
							<br/> -&nbsp; <b>Edit Events:</b> you can drag the event inside of the layer to change the time in which the event gets executed. And, you can resize an event from the edges to
							extend the length of the event. If you prefer, you can click on an event and the right side menu will show the event properties that you can edit.
							<br/> -&nbsp; <b>Add Layer:</b> you can add as many layers as you want. Layers let you organize your events and it makes it easier to work with overlapping events. To add a layer just click
							the plus icon on the bottom left of the screen.
							<br/> -&nbsp; <b>Delete Layer:</b> click on the trash can icon next to the layer number. <u>This will delete a layer and all the events inside of such layer.</u>
					</p><br/>
					<img src="${layerHelp}" width="250px"/>
				</div>
				<hr/>
				<div class="section large-img">
					<p><b>Zoom & Scroll:</b>
							<br/> -&nbsp; <b>Zoom:</b> when working with large videos, you can zoom in to edit your events more acurrately. To zoom in and out drag and drop the small blue dot in the left bottom of the screen
							and move it right to zoom in and left to zoom out.
							<br/> -&nbsp; <b>Scroll:</b> when you zoom in or out the scroll indicator (blue bar at the bottom of the screen) will change size. To scroll you can use the arrows next to the scroll indicator.
							Double arrows will take you to the respective end of the layer, and single arrows will scroll a short distance to the indicated side.
					</p><br/>
					<img src="${zoomrHelp}"/>
				</div>`,
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