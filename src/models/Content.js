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
	published = true
	requester = ``
	resourceId = ``
	thumbnail = ``
	views = 0
	url = ``
	clips = ``
	resource = {
		keywords: [],
	}
	fileId = ``

	settings = {
		aspectRatio:`1.77`,
		captionTrack: [],
		showTranscripts: false,
		showWordList: false,
		targetLanguage: ``,
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
			this.resource.keywords = obj[`tags`] ?
				obj[`tags`].split(`; `)
				: ``

			this.name = obj[`title`]
			this.published = obj[`published`]
			this.clips = obj[`clips`] ?
				obj[`clips`]
				: ``

			this.fileId = obj[`file-id`]

			this.settings = {
				allowDefinitions: obj[`allow-definitions`],
				annotationDocument: obj[`annotations`] ?
					this.stringToArray(obj[`annotations`])
					: ``,
				showCaptions: obj[`allow-captions`],
				targetLanguage: obj[`file-version`] !== `` ?
					obj[`file-version`]
					: `English`,
				allowNote: obj[`allow-notes`],
			}

		}

	}

	stringToArray(inputString){
		// TODO: Once everything goes through this, then we can get rid of this code. Mainly the if block.
		if (inputString.match(/};\s+/)){
			const array = []
			const temp = inputString.split(`; `)

			temp.forEach(element => {
				if(element !== ``)
					array.push(JSON.parse(element))
			})
			return array
		} else if(inputString.match(/^\[.*\]$/)) {
			const array = JSON.parse(inputString)
			return array
		}else
			alert(`The following annotations array is invalid. Please send the following string to the Y-Video team: ${inputString}`)

	}
}
