/*
 * Created with IntelliJ IDEA.
 * User: josh
 * Date: 6/21/13
 * Time: 10:12 AM
 * To change this template use File | Settings | File Templates.
 */
class ContentSettings {

	settingsTemplate = `<form class="form-horizontal">\
			{{#controls:c}}\
			<div class="container-fluid">\
					<div class="form-group">\
							{{#(controlsSettings[c].include(context, content))}}\
									{{#(type == 'radio')}}\
									{{#label}}<span class="control-label">{{label}}</span>{{/label}}\
									<div class="controls">\
											{{#items}}\
											<label style="display:block;">\
													<input type="radio" name="{{setting}}" value="{{.value}}">{{.text}}\
											</label>\
											{{/items}}\
									</div>\
									{{/type}}\
									{{#(type == 'checkbox')}}\
									{{#label}}<span class="control-label">{{label}}</span>{{/label}}\
									<div class="controls">\
											<input type="checkbox" checked="{{setting}}">\
									</div>\
									{{/type}}\
									{{#(type == 'multicheck')}}\
									{{#label}}<span class="control-label">{{label}}</span>{{/label}}\
									<div class="controls">\
											{{#items}}\
											<label style="display:block;">\
													<input type="checkbox" name="{{setting}}" value="{{.value}}">{{.text}}\
											</label>\
											{{/items}}\
									</div>\
									{{/type}}\
									{{#(type == 'button')}}\
									<div class="controls">\
											<button class="btn {{classes}}" on-click="click:{{name}}">{{label}}</button>\
									</div>\
									{{/type}}\
									{{#(type == 'superselect')}}\
											<div>\
													{{#label}}<span class="control-label">{{label}}</span>{{/label}}\
													<SuperSelect icon="icon-globe" text="Select Language" value="{{setting}}" btnpos="left" multiple="true" options="{{items}}" modal="configurationModal">\
											</div>\
									{{/type}}\
							{{/include}}\
							{{^(controlsSettings[c].include(context, content))}}\
									{{#(type == 'radio')}}\
									{{#label}}<span class="control-label">{{label}}</span>{{/label}}\
									{{#none}}<div class="controls">\{{none}}</div>{{/none}}\
									{{/type}}\
									{{#(type != 'radio')}}\
									{{#label}}<span class="control-label">{{label}}</span>{{/label}}\
									{{#none}}<div class="controls">\<i>{{none}}</i></div>{{/none}}\
									{{/type}}\
							{{/include}}\
					</div>\
			</div>\
			{{/controls}}\
	</form>\
	<style>\
.controls { white-space: pre-line; }\
</style>`

	predefined = {
		saveButton: {
			type: `button`,
			label: `Save`,
			name: `save`,
			// none: "Save option not available",
			classes: `btn-blue`,
			include() {
				return true
			},
			setting() { },
			items() { }
		},
		aspectRatio: {
			type: `radio`,
			label: `Player Aspect Ratio:`,
			name: `aspectRatio`,
			include() {
				return true
			},
			setting(content) {
				return content.settings.aspectRatio
			},
			items() {
				return Object.keys(Ayamel.aspectRatios).map((name) => {
					return { text: name, value: Ayamel.aspectRatios[name] }
				})
			}
		},
		showCaptions: {
			type: `checkbox`,
			label: `Show Captions:`,
			name: `showCaptions`,
			none: `No captions to show`,
			include(content) {
				return !!content.enableableCaptionTracks.length
			},
			setting(content) {
				return content.settings.showCaptions === `true`
			},
			items() { }
		},
		showAnnotations: {
			type: `checkbox`,
			label: `Show text annotations:`,
			name: `showAnnotations`,
			none: `No annotations to show`,
			include(content) {
				return !!content.enableableAnnotationDocuments.length
			},
			setting(content) {
				return content.settings.showAnnotations === `true`
			},
			items() { }
		},
		allowDefinitions: {
			type: `checkbox`,
			label: `Allow automatic definitions:`,
			name: `allowDefinitions`,
			none: `No tracks available`,
			include(content) {
				return !!content.enableableCaptionTracks.length
			},
			setting(content) {
				return content.settings.allowDefinitions === `true`
			},
			items() { }
		},
		targetLanguages: {
			type: `superselect`,
			label: `Definition Languages:`,
			name: `targetLanguages`,
			include(content) {
				return !!content.enableableCaptionTracks.length
			},
			setting(content) {
				return (content.settings.targetLanguages || ``)
					.split(`,`).filter((s) => {
						return !!s
					})
			},
			items() {
				langList = Object.keys(Ayamel.utils.p1map).map((p1) => {
					const code = Ayamel.utils.p1map[p1],
						engname = Ayamel.utils.getLangName(code, `eng`),
						localname = Ayamel.utils.getLangName(code, code)
					return { value: code, text: engname, desc: localname !== engname ? localname : void 0 }
				})

				langList.push({ value: `apc`, text: `North Levantine Arabic` })
				langList.push({ value: `arz`, text: `Egyptian Arabic` })
				return langList.sort((a, b) => {
					return a.text.localeCompare(b.text)
				})
			}
		},
		showTranscripts: {
			type: `checkbox`,
			label: `Show Transcripts:`,
			name: `showTranscripts`,
			none: `No transcripts to show`,
			include(content) {
				return !!content.enableableCaptionTracks.length
			},
			setting(content) {
				return content.settings.showTranscripts === `true`
			},
			items() { }
		},
		showWordList: {
			type: `checkbox`,
			label: `Show Word List:`,
			name: `showWordList`,
			none: `No wordlists to show`,
			include(content) {
				// logical because you wont be able to add to a wordlist unless you have captions
				// however, may need to change if we have different criteria
				return !!content.enableableCaptionTracks.length
			},
			setting(content) {
				return content.settings.showWordList === `true`
			},
			items() { }
		},
		enabledCaptionTracks: {
			type: `multicheck`,
			label: `Enabled Caption Tracks:`,
			name: `captionTracks`,
			none: `No captions to enable`,
			include(content) {
				return !!content.enableableCaptionTracks.length
			},
			setting(content) {
				return (content.settings.captionTrack || ``)
					.split(`,`).filter((s) => {
						return !!s
					})
			},
			items(content) {
				// Get the document name and language from the ID
				return content.enableableCaptionTracks.map((resource) => {
					const langCode = resource.languages.iso639_3[0],
						language = Ayamel.utils.getLangName(langCode)
					return {
						text: resource.title + ` (` + language + `)`,
						value: resource.id
					}
				})
			}
		},
		enabledAnnotations: {
			type: `multicheck`,
			label: `Enabled Annotations:`,
			name: `annotationDocs`,
			none: `No annotations to enable`,
			include(content) {
				return !!content.enableableAnnotationDocuments.length
			},
			setting(content) {
				return (content.settings.annotationDocument || ``)
					.split(`,`).filter((s) => {
						return !!s
					})
			},
			items(content) {
				// Get the document name and language from the ID
				return content.enableableAnnotationDocuments.map((resource) => {
					const langCode = resource.languages.iso639_3[0],
						language = Ayamel.utils.getLangName(langCode)
					return {
						text: resource.title + ` (` + language + `)`,
						value: resource.id
					}
				})
			}
		},
		visibility: {
			type: `radio`,
			label: `Visibility:`,
			name: `visibility`,
			include() {
				return true
			},
			setting(content) {
				return content.visibility || 1
			},
			items() {
				return [
					{
						text: `Private`,
						value: 1
					},
					{
						text: `Tightly Restricted (Me and courses I add this to can see this)`,
						value: 2
					},
					{
						text: `Loosely Restricted (Me, teachers, and courses we add this to can see this)`,
						value: 3
					},
					{
						text: `Public (Everybody can see this)`,
						value: 4
					}
				]
			}
		}
	}

	settings = {
		video: [predefined.aspectRatio, predefined.allowDefinitions, predefined.targetLanguages, predefined.showTranscripts, predefined.showWordList, predefined.showCaptions, predefined.enabledCaptionTracks, predefined.showAnnotations, predefined.enabledAnnotations, predefined.visibility, predefined.saveButton],
		audio: [predefined.aspectRatio, predefined.showCaptions, predefined.allowDefinitions, predefined.targetLanguages, predefined.showAnnotations, predefined.showTranscripts, predefined.enabledCaptionTracks, predefined.enabledAnnotations, predefined.visibility, predefined.saveButton],
		image: [predefined.aspectRatio, predefined.showCaptions, predefined.allowDefinitions, predefined.targetLanguages, predefined.showAnnotations, predefined.showTranscripts, predefined.enabledCaptionTracks, predefined.enabledAnnotations, predefined.visibility, predefined.saveButton],
		text: [predefined.aspectRatio, predefined.allowDefinitions, predefined.targetLanguages, predefined.showAnnotations, predefined.enabledAnnotations, predefined.visibility, predefined.saveButton]
	}

	getResources = ids => {
		return Promise.all(ids.map(id => {
			return ResourceLibrary.load(id)
		}))
	}

	getCaptionTracks = resource => {
		const captionTrackIds = resource.relations
			.filter((r) => {
				return r.type === `transcript_of`
			})
			.map((r) => {
				return r.subjectId
			})
		return getResources(captionTrackIds)
	}

	getAnnotationDocs = resource => {
		const annotationIds = resource.relations
			.filter((r) => {
				return r.type === `references`
			})
			.map((r) => {
				return r.subjectId
			})
		return getResources(annotationIds)
	}

	createControls = (config, context, content) => {
		return {
			type: config.type,
			name: config.name,
			label: config.label,
			none: config.none,
			classes: config.classes,
			setting: config.setting(context, content),
			items: config.items(context, content)
		}
	}

	/* args: courseId, owner, userId, content, resource, holder, action */
	ContentSettings = args => {

		// Determine what content type we are dealing with
		const context = {
			courseId: args.courseId || 0,
			owner: args.owner || false,
			userId: args.userId || 0
		}

		Promise.all([getCaptionTracks(args.resource), getAnnotationDocs(args.resource)]).then(data => {

			args.content.enableableCaptionTracks = data[0]
			args.content.enableableAnnotationDocuments = data[1]

			// Create the form
			const controlsSettings = settings[args.content.contentType]
			const controls = controlsSettings.map((config) => {
				return createControls(config, context, args.content)
			})

			const ractive = new Ractive({
				el: args.holder,
				template: settingsTemplate,
				data: { controls, content: args.content, context, controlsSettings }
			})

			ractive.on(`click`, (evt, which) => {
				evt.original.preventDefault()
				if (which !== `save`) return

				// submit form data via ajax
				const xhr = new XMLHttpRequest(),
					fd = new FormData()

				fd.append(`contentType`, content.contentType)
				ractive.get(`controls`).forEach((control, index) => {
					if (control.type === `button`) return
					const setting = ractive.get(`controls[${index}].setting`),
						name = control.name;
					(setting instanceof Array ? setting : [setting]).forEach((value) => {
						fd.append(name, `` + value)
					})
				})

				xhr.addEventListener(`load`, () => {
					document.location.reload(true)
				})

				xhr.addEventListener(`error`, () => {
					alert(`Something broke.`)
				})

				xhr.open(`POST`, args.action)
				xhr.send(fd)
			})
		})
	}
}

export default ContentSettings
