import ContentLoader from 'lib/js/contentRendering/ContentLoader'

const getCaptionAider = (content, contentHolder) => {
	const loader = ContentLoader.castContentObject(content).then((content) => {
		return ResourceLibrary.load(content.resourceId).then(function (resource) {
			content.settings.showCaptions = "true";
			return {
				content: content,
				resource: resource,
				contentId: content.id,
				holder: contentHolder,
				permission: "edit",
				screenAdaption: {
					fit: true,
					scroll: true,
					padding: 61
				},
				startTime: 0,
				endTime: -1,
				renderCue: renderCue,
				//noUpdate: true, // Disable transcript player updating for now
				callback: callback
			};
		});
	}).then(ContentRenderer.render)

	function callback(args) {
		let translator = new Ayamel.classes.Translator()

		commandStack = new EditorWidgets.CommandStack()
		trackResources = args.trackResources
		trackMimes = args.trackMimes
		videoPlayer = args.mainPlayer

		timeline = new Timeline(document.getElementById(`timeline`), {
			stack: commandStack,
			syncWith: videoPlayer,
			saveLocation: `server`,
			dropLocation: `file`,
			width: document.body.clientWidth || window.innerWidth,
			length: 3600, start: 0, end: 240,
			trackMode: `showing`,
			tool: Timeline.SELECT,
			showControls: true,
			canGetFor,
			getFor,
		})

		updateSpacing()

		captionEditor = CaptionEditor({
			stack: commandStack,
			refresh () { videoPlayer.refreshLayout(); },
			rebuild () { videoPlayer.rebuildCaptions(); },
			timeline,
		})

		// Check for unsaved tracks before leaving
		window.addEventListener(`beforeunload`, (e) => {
			var warning = "You have unsaved tracks. Your unsaved changes will be lost.";
			if (!commandStack.isSavedAt(timeline.saveLocation)) {
				e.returnValue = warning;
				return warning;
			}
		}, false)

		window.addEventListener(`resize`, () => {
			timeline.width = window.innerWidth;
		}, false)

		//Preload tracks into the editor
		videoPlayer.addEventListener(`addtexttrack`, (event) => {
			var track = event.detail.track;
			if (timeline.hasCachedTextTrack(track)) { return; }
			timeline.cacheTextTrack(track, trackMimes.get(track), 'server');
		})

		// EVENT TRACK EDITOR event listeners
		timeline.on(`select`, (selected) => {
			selected.segments[0].makeEventTrackEditor(selected.segments[0].cue, videoPlayer);
		})

		timeline.on(`unselect`, (deselected) => { deselected.segments[0].destroyEventTrackEditor(); })

		// Auto delete eventTrackEditor when track is deleted
		timeline.on(`delete`, (deleted) => { deleted.segments[0].destroyEventTrackEditor(); })

		// keep the editor and the player menu in sync
		timeline.on(`altertrack`, () => { videoPlayer.refreshCaptionMenu(); })

		//TODO: Integrate the next listener into the timeline editor
		timeline.on(`activechange`, () => { videoPlayer.rebuildCaptions(); })

		timeline.on(`cuechange`, (evt) => {
			if (evt.fields.indexOf('text') === -1) { return; }
		})

		timeline.on(`addtrack`, (evt) => {
			videoPlayer.addTextTrack(evt.track.textTrack);
			updateSpacing();
		})

		timeline.on(`removetrack`, (evt) => {
			updateSpacing();
		})

		timeline.addMenuItem([`Track`, `Clone`, `Clone with Translation`], {
			name: `Clone with Translation`,
			action () {
				var tl = this.timeline,
					tid = this.track.id;
				tl.getFor('newtrack',
					['kind', 'lang', 'name', 'mime', 'overwrite'],
					{
						kind: void 0,
						lang: void 0,
						mime: void 0,
						overwrite: false
					}
				).then(function (values) {
					tl.cloneTrack(
						tid,
						{
							kind: values[0],
							lang: values[1],
							name: values[2],
							mime: values[3]
						},
						function (cue, ott, ntt, mime) {
							var txt = Ayamel.utils.extractPlainText(cue.getCueAsHTML());

							if (ott.language === ntt.language) {
								return txt;
							}

							return translator.translate({
								srcLang: ott.language,
								destLang: ntt.language,
								text: txt
							}).then(function (data) {
								return data.translations[0].text;
							}).catch(function () {
								return txt;
							});
						},
						values[4]
					);
				});
			},
		})
	}
}

export default getCaptionAider
