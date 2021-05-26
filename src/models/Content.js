export default class Content {
	authKey = ``
	collectionId = null
	contentType = ``
	dateValidated = ``
	description = ``
	expired = false
	fullVideo = false
	id = null
	isCopyrighted = false
	name = ``
	physicalCopyExists = false
	published = false
	requester = ``
	resourceId = ``
	thumbnail = ``
	views = 0
	url = ``
	clips = ``
	resource = {
		keywords: [],
	}

	settings = {
		aspectRatio:`1.77`,
		captionTrack: [],
		showTranscripts: false,
		showWordList: false,
		targetLanguages: ``,
		showCaptions: true,
		allowDefinitions: true,
		annotationDocument: [],
	}

	constructor(obj){

		if(obj !== undefined){
			this.id = obj[`id`]
			this.views = obj[`views`]
			this.collectionId = obj[`collection-id`]
			this.url = obj[`url`]
			this.contentType = obj[`content-type`]
			this.thumbnail = obj[`thumbnail`]
			this.description = obj[`description`]
			this.resourceId = obj[`resource-id`]
			this.resource.keywords = obj[`tags`] ? obj[`tags`].split(`; `) : ``
			this.name = obj[`title`]
			this.published = obj[`published`]
			this.clips = obj[`clips`] ? obj[`clips`] : ``

			this.settings = {
				allowDefinitions: obj[`allow-definitions`],
				annotationDocument: obj[`annotations`] ? this.stringToArray(obj[`annotations`]) : ``,
				showCaptions: obj[`allow-captions`],
				targetLanguages: obj[`file-version`],
				allowNote: obj[`allow-notes`],
			}
		}

	}

	stringToArray(string){
		const array = []

		const temp = string.split(`; `)

		temp.forEach(element => {
			if(element !== ``)
				array.push(JSON.parse(element))

		})

		return array
	}
}
