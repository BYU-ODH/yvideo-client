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
import subHelp from 'assets/help/help-te-subtitle.png'

import {
	// adminService,
	interfaceService,
} from 'services'

/** c
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
		toggleModal,
	} = props

	const index = {
		'Manage Collections': {
			htmlInstruction: `
				<div class="section">
					<p><b>Manager:</b> Select which collection you want to edit on the left menu
					<br/>
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
					<p><b>Managing content:</b> Each collection will display a list of content. Each content will show the name, translation icon, captions icon, a link to edit content, and a link to edit the video.
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
					<p><b>Menu:</b><br/> To open the menu, click on the icon in the top right corner of the screen. For instructors, you can find links to view and manage your collections, and find other collections.
					</p><br/>
					<img src="${menu}" width="100px"/>
				</div>
				<hr/>
				<div class="section">
					<p><b>Collections:</b><br/> Collections show all of the content available to a class. Click on a collection to show the videos available to you. Click the Icon shown on the right to switch between compact and block views.<br/>
					For instructors, a “Manage Collections” Icon will appear in the top right, where you can create and edit collections.
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
				<div class="section">
					<p><b>Subtitles:</b>
							<br/> -&nbsp;You can create a new subtitle track either from scratch or from a file ending in .srt or .vtt.
							<br/> -&nbsp; <b>Start from Scratch:</b> This option will start you out with an entirely empty subtitle track.
							<br/> -&nbsp; <b>Start from File:</b> Choose an SRT or VTT file, and a new track will be created with the subtitles from the file.
							<br/> -&nbsp; <b>Add Subtitle:</b> Once you have a subtitle track, a new event card below the others will appear titled "Add Subtitle", drag this card to a subtitle track to add a subtitle.
							<br/> -&nbsp; <b>Delete Subtitle:</b> click on the trash can icon next to the track Title. <u>This will delete the subtitle track.</u>
							<br/> -&nbsp; <b>Side Editor</b> Clicking on a subtitle will open the side editor where you can edit the Title and the Language. There is also a table where you can edit start/end times and the text of all subtitles, as shown to the right.
					</p><br/>
					<img src="${subHelp}" width="250px"/>
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
				</div>
				`,
		},
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