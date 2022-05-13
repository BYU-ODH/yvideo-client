import React from 'react'
import { connect } from 'react-redux'

import HelpDocumentation from '../components/HelpDocumentation'

import menu from 'assets/menu-black.svg'
import list from 'assets/list-view.svg'
import block from 'assets/block-view.svg'
import seek from 'assets/skip-forward.svg'
import startOverIcon from 'assets/start_over_icon_black.svg'

import manager from 'assets/help/help-manager.png'

import content from 'assets/help/help-content.png'
import contentEdit from 'assets/help/help-content-edit.png'
import eventHelp from 'assets/help/help-te-event.png'
import subtitleHelp from 'assets/help/help-te-subtitle.png'
import layerHelp from 'assets/help/help-te-layers.png'
import zoomHelp from 'assets/help/help-te-zoom.png'
import subHelp from 'assets/help/help-te-subtitle.png'
import translationHelp from 'assets/help/help-translation.png'
import importantWordHelp from 'assets/help/help-important-word.png'

// player
import clockIcon from 'assets/clock-black.svg'
import bookIcon from 'assets/sidebar-black.svg'
import chevron from 'assets/player-chevron-left-black.svg'

import {
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
		// toggleTip,
	} = props

	const index = {
		'Manage Collections': {
			htmlInstruction: `
				<div class="section flex-column">
					<h3>Manager</h3>
					<p style="margin: 0px;">
						<img src="${manager}" width="250px"/>
						Select which collection you want to edit on the left menu
						<br/>
						<br/>- &nbsp;<b>Published</b> collections are the ones that students can see.
						<br/>- &nbsp;<b>Unpublished</b> collections are hidden from students.
						<br/>- &nbsp;<b>Archived</b> collections are the ones that you are not working on and students can't see them.
						<br/><br/>
						<b>Create New Collection:</b> this button allows you to create a new collection and add it as an unpublished collection, so students can't see it.
					</p>
					<h4>Managing Collections</h4><br/>
					<ul>
						<p>Under content and permissions you can do the following</p>
						<li><b>Content</b>: edit all the content that belongs to your collection including creating new videos, adding subtitles, editting the video, and more</li>
						<li><b>Permissions</b>: add users to have editor priviledge in your collection. The users can be people that are auditing the class, TAs, other professors, or students as long as they have a BYU netid</li>
					</ul>
				</div>
				<div class="section large-img">
					<h3>Managing Content</h3>
					<p>
						Each collection will display a list of content. Each content will show the name, thumbnail, a link to edit content, and other links to edit other properties
						To edit a content click on the edit button on the right.
						<img src="${content}" />
					</p>
					<ul>
						<li><b>Video Editor:</b> this page allows users to create "events" or actions that will occur when the video is played. Events include skip, pause, mute, blur, and blank.</li>
						<li><b>Subtitle Editor:</b> this editor allows users to create subtitles for the desired videos or you can import subtitles (from supported formats) that already exist </li>
						<li><b>Clip Editor:</b> this page lets users create small clips to emphasize a time in a video or guide students to a specific piece of content in a long video</li>
					</ul>
					<div style="text-align: left; width: 100%;">
						<br/>
						<b>Edit Content:</b><br/><br/>
						<ul>
							<li><b>Definitions:</b> allow quick translation to help students understand the meaning of a word</li>
							<li><b>Caption:</b> turn captions on and off. This will turn off captions on the video and hide the transcript on the side of the video</li>
							<li><b>Tags:</b> this is a way to let users find content based on topics</li>
							<li><b>Important Words:</b> it is a list of words to be highlighted in the transcript.
							These words will be clickable to allow students to get a quick translation for those specific words</li>
						</ul>
						<div style="display: flex; width: 100%; height: auto;">
							<img src="${contentEdit}" width="auto" height="auto" style="max-width: 800px; margin: auto;"/>
						</div>
					</div>
				</div>`,
		},
		'Home Page': {
			htmlInstruction: `
				<div class="section flex-column">
					<h3>Menu</h3>
					<p>
						<img src="${menu}" width="50px"/>
						To open the menu, click on the menu icon located on the top right corner of the screen. For instructors, you can find links to view and manage your collections, and find other collections.
					</p>
				</div>
				<div class="section flex-column">
					<h3>Collections</h3>
					<p>Collections contain a group of contents. To play a content in a collection just click on the content you want to watch.
					For instructors, a “Manage Collections” button will appear in the top right, where you can create and edit collections.
					</p><br/>
				</div>
				<div class="section flex-column">
					<h3>View Icons</h3>
					<p>These buttons are used to toggle between a list view and a block view. A block view will display all contents in a collection horizontally, and the
					list view will display contents vertically.
					</p>
					<ul>
						<li>List view: <img src="${list}" width="30px" style="margin-top: 0px; margin-left: 5px; position: relative; top: 5px;"/></li>
						<li>Block view: <img src="${block}" width="30px" style="margin-top: 0px; margin-left: 5px; position: relative; top: 5px;"/></li>
					</ul>
				</div>
				`,
		},
		'Video Editor': {
			htmlInstruction: `
				<div class="section flex-column" style="flex-direction: column">
					<h3>General</h3>
					<p style="margin: 0px">
						<br/> -&nbsp; <b>Video Controls:</b> Like any other video you can <b>play/pause</b>, <b>mute/unmute</b>, and <b>seek</b> to a desired time in the video using the time bar.
						<br/> -&nbsp; <b>Hot Key:</b> there are four hot keys for this video player and they are all to move back and form in the video.
						</p>
					<ol>
						<li>Comma: rewind .1 second</li>
						<li>Period: forward .1 second</li>
						<li>Left Arrow: rewind 1 second</li>
						<li>Right Arroe: forward 1 second</li>
					</ol>
					<p style="margin: 0px">
						<br/> -&nbsp; <b>Visual Help:</b> to let you know where you are in the video you have two main sources.
					</p>
					<ol>
						<li>The time indicator at the bottom of the video</li>
						<li>The red bar over the layers indicating how far along you are on the video with respect of the layers</li>
					</ol>
				</div>
				<div class="section flex-column">
					<h3>Side Menu</h3>
					<p>
						<img src="${eventHelp}" width="400px"/>
						<br/> -&nbsp; <b>Editor:</b> the editor makes it easy to edit events. If you click on an event, the side menu will change and allow you to edit the event options based on the event type. You are also able
						to delete events using this menu
						<br/> -&nbsp; <b>Save:</b> after you made your changes to the video the last step is to save the video by clicking the save button on the top right of the screen. <b><i>If you do not save it you will lose
						all your changes</i></b>
						<br/> -&nbsp; <b>Export:</b> after saving you changes, you can export all your events in a JSON format to an external file. <b>JSON is a format that almost any application or programming language can read</b>

					</p>
				</div>
				<div class="section flex-column">
					<h3>Layers</h3>
					<p>
							<img src="${layerHelp}" width="200px"/>
							<br/> Layers are separated by event types. This way every layer has only one type of event which makes it easy to manager or order the events.
							<br/>
							<br/> -&nbsp; <b>Add Events:</b> Click on the <b>plus icon</b> next to the event type that you want to add. The event will be added at the beginning of the layer as default or at the current video time indicated by
							the red bar.
							<br/> -&nbsp; <b>Edit Events:</b> you can drag the event inside of the layer to change the time in which the event gets executed. And, you can resize an event from the edges to
							extend the length of the event. If you prefer, you can click on an event and the right side menu will show the event properties that you can edit.
							<br/> -&nbsp; <b>Delete Layer:</b> click on the trash can icon next to the layer number. <u>This will delete a layer and all the events inside of such layer.</u>

					</p><br/>
				</div>
				<div class="section flex-column">
					<h3>Zoom & Scroll</h3>
					<p>
							<img src="${zoomHelp}" width="250px" style="padding: 5px;"/>
							<br/> -&nbsp; <b>Zoom:</b> when working with large videos, you can zoom in to edit your events more acurrately. To zoom in and out drag and drop the small blue dot to the right to zoom in and to the
							left to zoom out. When zooming the layers will automatically zoom into the time indicated by the red bar.
							and move it right to zoom in and left to zoom out.
							<br/> -&nbsp; <b>Scroll:</b> Scroll happens automatically. If the video is zoomed in the scroll will automatically move to follow along the video.

					</p><br/>
				</div>`,
		},
		'Subtitle Editor': {
			htmlInstruction: `
				<div class="section">
					<p><b>Side Menu:</b>
						<br/> -&nbsp; <b>Subtitles:</b> Click on the blue title of the layer and the right side of the screen.
						<br/> -&nbsp; <b>Save:</b> After you made your changes to the video the last step is to save the video by clicking the save button. <b><i>If you do not save it you will lose
						all your changes.</i> The green check icon represent that there is nothing changed.</b>
					</p><br/>
					<img src="${subtitleHelp}" width="200px"/>
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
					<img src="${zoomHelp}"/>
				</div>`,
		},
		'Player Mobile': {
			htmlInstruction: `
				<div class="section flex-column">
					<h3>Toolbar</h3>
					<ul>
						<li><img class="icon" src="${bookIcon}"/>: This icon shows the transcript which contains all the subtitles in the video to follow along</li>
						<li><img class="icon" src="${clockIcon}"/>: This icon allows you to change the speed of the video. Faster is any number above normal speed or 1</li>
						<li>&nbsp;<b>CC</b>&nbsp;&nbsp;: This icon allows you to turn on or off the captions</li>
						<li>Play/Pause and Full screen icons: Common video functionality</li>
					</ul>
				</div>
				<hr/>
				<div class="section flex-column">
					<h3>Transcript</h3>
					<ol>
						<li>The transcript represents all the captions or subtitles for this video</li>
						<li>Each line in the transcript is clickable. When a line is clicked, the video will seek to the time in the video where that line is mentioned</li>
						<li>Each line is highlighted to show which line in the transcript is being displayed in the video</li>
						<li>Even when the video is playing the transcript can be shown to follow along the audio</li>
					</ol>
				</div>`,
		},
		'Player': {
			htmlInstruction: `
				<div class="section flex-column">
					<h3>Toolbar</h3>
					<ul>
						<li><img class="icon" src="${clockIcon}"/>: This icon allows you to change the speed of the video. Faster is any number above normal speed or 1</li>
						<li><img class="icon" src="${startOverIcon}"/>: This icon allows you to start the video over from the beginning</li>
						<li>&nbsp;<b>CC</b>&nbsp;&nbsp;: This icon allows you to turn on or off the captions</li>
						<li>Play/Pause and Full screen icons: These support common video functionality</li>
					</ul>
				</div>
				<div class="section flex-column">
					<h3>Side Bar</h3>
					<ul>
						<li><img class="icon" src="${chevron}"/>: This icon displays or hides the transcript which contains the captions, or subtitles in some cases, for the entire video</li>
						<li><img class="icon" src="${seek}"/>: This takes you to the start time before a subtitle displays</li>
					</ul>
				</div>
				<div class="section flex-column">
					<h3>Transcript</h3>
					<ol>
						<li>The transcript represents all the captions or subtitles for this video</li>
						<li>Each line in the transcript is clickable. When a line is clicked, the video will seek to the time in the video where that line is mentioned</li>
						<li>Each line is highlighted to show which line in the transcript is being displayed in the video</li>
					</ol>
				</div>`,
		},
		'Important Words': {
			htmlInstruction: `
				<div class="section flex-column">
					<h3>Subtitle Selection & Translation</h3>
					<p style="text-align: left; width: 100%;">
						Important words are added to a specific subtitle, so select the subtitle using the drop-down on the top left.
					</p>
					<br/>
					<h4>Translation</h4>
					<p>
						<img src="${translationHelp}"/>
						The translation portion of this modal is on the left side. The translation portion allows users to see if there is a translation available from
						a foreign language to english. Please, notice a few languages are supported. Check the bottom of the modal to find supported languages.
					</p>
				</div>
				<div class="section flex-column">
					<h3>Important Words</h3>
					<p>
						<img src="${importantWordHelp}"/>
						Adding important words to a subtitle allows instructors to point out words that the students should know.
						<br/> Important words are highlighted in the transcript and they become clickable. When a student clicks on a word a translation is given if available.
					</p>
				</div>`,
		},
		'Manage Resource': {
			htmlInstruction: `
				<div class="section flex-column">
					<h3>Resources</h3>
					<p style="text-align: left; width: 100%;">
						Y-video stores files in a server, and the same file can be used to create more than one content. <b>Resources let you upload files to create content</b>. You can learn to create a resource following
						the video tutorial below
					</p>
					<br/>
					<label><b>Resource tips</b></label><br/>
					<ul>
						<li>The resource is a general placeholder for your files</li>
						<li>A single resouce lets you upload files to work with different languages</li>
						<li>A resource lets you manage who can access your files. So, you can share your files with other professors and vice versa</li>
					</ul>
				</div>`,
		},
		'Subtitle Editor': { // eslint-disable-line no-dupe-keys
			htmlInstruction: `
			<div class="section flex-column">
				<h3>Creating Subtitles/Captions</h3>
				<p style="text-align: left; width: 100%;">
					Subtitles and captions can be created from an existing subtitles file (SRT or VTT), or they can be created manually. Follow the create subtitles tutorial to learn how to do it.<br/>
					One video can have many captions or subtitles in different languages. The subtitle or captions that a content uses is based on the target language of the video.
				</p>
				<br/>
				<h4>Editing</h4><br/>
				<ul>
					<li><b>Tracks</b> at the bottom of the page allows you to create a new caption and or subtitle track</li>
					<li>Click on any text slot in the <b>track bar</b> you want to edit to open the <b>side editor</b></li>
					<li>In the side editor you can <b>edit the text and the start and end times</b> for each of the slots</li>
					<li>To <b>add</b> a new text slot you can click on the plus icon at the bottom of the last text slot. And, to <b>delete</b> a text slot click on the red trash can on the right</li>
				</ul>
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
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpDocumentationContainer)
