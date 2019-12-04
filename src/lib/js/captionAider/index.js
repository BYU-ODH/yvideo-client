import ContentLoader from 'lib/js/contentRendering/ContentLoader'
import ContentRenderer from 'lib/js/contentRendering/ContentRenderer'
import { Ayamel, ResourceLibrary } from 'yvideojs'
import { CaptionEditor, Timeline } from 'yvideo-subtitle-timeline-editor'
// import { AudioTrack, CaptionEditor, Resampler, Slider, TextTrack, Timeline, TimelineControls, TimelineMenus, TimelineShortcuts, TimelineSkin, TimelineView, WaveForm } from 'yvideo-subtitle-timeline-editor'
import { EditorWidgets } from 'yvideo-editorwidgets'

import {
	EditTrackData,
	GetLocation,
	GetLocationNames,
	LoadAudio,
	LoadTrackData,
	LoadTranscript,
	NewTrackData,
	SaveTrackData,
	ShowTrackData,
} from './modals'

const getCaptionAider = (content, contentHolder, renderModal) => {

	ContentLoader.castContentObject(content).then((content) => {
		return ResourceLibrary.load(content.resourceId).then((resource) => {
			content.settings.showCaptions = `true`
			return {
				content,
				resource,
				contentId: content.id,
				holder: contentHolder,
				permission: `edit`,
				screenAdaption: {
					fit: true,
					scroll: true,
					padding: 61,
				},
				startTime: 0,
				endTime: -1,
				renderCue: CaptionEditor.make,
				// noUpdate: true, // Disable transcript player updating for now
				callback: args => {
					const translator = new Ayamel.classes.Translator()

					const commandStack = new EditorWidgets.CommandStack()
					const trackMimes = args.trackMimes
					const videoPlayer = args.mainPlayer

					const timeline = new Timeline(document.getElementById(`timeline`), {
						stack: commandStack,
						syncWith: videoPlayer,
						saveLocation: `server`,
						dropLocation: `file`,
						width: document.body.clientWidth || window.innerWidth,
						length: 3600, start: 0, end: 240,
						trackMode: `showing`,
						tool: Timeline.SELECT,
						showControls: true,
						canGetFor: key => {
							switch(key) {
							case `newtrack`:
							case `edittrack`:
							case `savetrack`:
							case `loadtrack`:
							case `showtrack`:
							case `loadlines`:
							case `loadaudio`:
							case `location`:
							case `locationNames`: return true
							default:
								return false
							}
						},
						getFor: (key, datalist) => {
							switch (key) {
							case `newtrack`:

								// TODO: Create a component that renders what newTrackData() rendered, which you can see on the github repo:
								// https://github.com/BYU-ODH/yvideo/blob/master/public/javascripts/pageScripts/captionAider.js
								// TODO: Import that component here, and pass it into the renderModal() function.
								// TODO: Learn how to add props to the component before passing it on to the toggleModal() redux thunk method
								// (hint: you might be able to do it with something called the "render prop". Google that.)

								// TODO: So i didn't account for what newTrackData() actually returns, so check to see what that is, and see if there's any way to copy it the Reactful way :)

								// return newTrackData(datalist)
								renderModal(NewTrackData, { datalist, timeline, langList })
								break
							case `edittrack`:
								renderModal(EditTrackData, { datalist, timeline })
								break
							case `savetrack`:
								renderModal(SaveTrackData, { datalist })
								break
							case `loadtrack`:
								renderModal(LoadTrackData, { datalist })
								break
							case `showtrack`:
								renderModal(ShowTrackData, { datalist })
								break
							case `loadlines`:
								renderModal(LoadTranscript, { datalist })
								break
							case `loadaudio`:
								renderModal(LoadAudio, { datalist })
								break
							case `location`:
								renderModal(GetLocation, { datalist })
								break
							case `locationNames`:
								renderModal(GetLocationNames, { datalist })
								break
							default:
								return Promise.reject(new Error(`Can't get data for ${key}`))
							}
						},
					})

					const updateSpacing = () => {
						document.getElementById(`bottomSpacer`).style.marginTop = `${document.getElementById(`bottomContainer`).clientHeight}px`
					}

					// const captionEditor = CaptionEditor({
					// 	stack: commandStack,
					// 	refresh() {
					// 		videoPlayer.refreshLayout()
					// 	},
					// 	rebuild() {
					// 		videoPlayer.rebuildCaptions()
					// 	},
					// 	timeline,
					// })

					// Check for unsaved tracks before leaving
					window.addEventListener(`beforeunload`, (e) => {
						const warning = `You have unsaved tracks. Your unsaved changes will be lost.`
						if (!commandStack.isSavedAt(timeline.saveLocation)) {
							e.returnValue = warning
							return warning
						}
					}, false)

					window.addEventListener(`resize`, () => {
						timeline.width = window.innerWidth
					}, false)

					// Preload tracks into the editor
					videoPlayer.addEventListener(`addtexttrack`, (event) => {
						const track = event.detail.track
						if (timeline.hasCachedTextTrack(track)) return
						timeline.cacheTextTrack(track, trackMimes.get(track), `server`)
					})

					// EVENT TRACK EDITOR event listeners
					timeline.on(`select`, (selected) => {
						selected.segments[0].makeEventTrackEditor(selected.segments[0].cue, videoPlayer)
					})

					timeline.on(`unselect`, (deselected) => {
						deselected.segments[0].destroyEventTrackEditor()
					})

					// Auto delete eventTrackEditor when track is deleted
					timeline.on(`delete`, (deleted) => {
						deleted.segments[0].destroyEventTrackEditor()
					})

					// keep the editor and the player menu in sync
					timeline.on(`altertrack`, () => {
						videoPlayer.refreshCaptionMenu()
					})

					// TODO: Integrate the next listener into the timeline editor
					timeline.on(`activechange`, () => {
						videoPlayer.rebuildCaptions()
					})

					timeline.on(`cuechange`, (evt) => {
						if (evt.fields.indexOf(`text`) === -1) return
					})

					timeline.on(`addtrack`, (evt) => {
						videoPlayer.addTextTrack(evt.track.textTrack)
						updateSpacing()
					})

					timeline.on(`removetrack`, (evt) => {
						updateSpacing()
					})

					timeline.addMenuItem([`Track`, `Clone`, `Clone with Translation`], {
						name: `Clone with Translation`,
						action() {
							const tl = this.timeline,
								tid = this.track.id
							tl.getFor(`newtrack`,
								[`kind`, `lang`, `name`, `mime`, `overwrite`],
								{
									kind: void 0,
									lang: void 0,
									mime: void 0,
									overwrite: false,
								}
							).then((values) => {
								tl.cloneTrack(
									tid,
									{
										kind: values[0],
										lang: values[1],
										name: values[2],
										mime: values[3],
									},
									(cue, ott, ntt, mime) => {
										const txt = Ayamel.utils.extractPlainText(cue.getCueAsHTML())

										if (ott.language === ntt.language)
											return txt

										return translator.translate({
											srcLang: ott.language,
											destLang: ntt.language,
											text: txt,
										}).then((data) => {
											return data.translations[0].text
										}).catch(() => {
											return txt
										})
									},
									values[4]
								)
							})
						},
					})
				},
			}
		})
	}).then(ContentRenderer.render)
}

export default getCaptionAider
