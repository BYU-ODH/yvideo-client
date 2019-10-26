class ContentSettings {

	constructor() {
		this.allowDefinitions = false
		this.annotationDocument = []
		this.aspectRatio = `1.77`
		this.captionTrack = []
		this.description = ``
		this.showAnnotations = false
		this.showCaptions = false
		this.showTranscripts = false
		this.showWordList = false
		this.targetLanguages = []
	}

	allowDefinitions = Boolean
	annotationDocument = Array
	aspectRatio = String
	captionTrack = Array
	description = String
	showAnnotations = Boolean
	showCaptions = Boolean
	showTranscripts = Boolean
	showWordList = Boolean
	targetLanguages = Array
}

export default class Content {

	constructor() {

		this.authKey = ``
		this.collectionId = -1
		this.contentType = ``
		this.dateValidated = ``
		this.description = ``
		this.expired = false
		this.fullVideo = false
		this.id = null
		this.isCopyrighted = false
		this.name = ``
		this.physicalCopyExists = false
		this.published = false
		this.requester = ``
		this.resourceId = ``
		this.thumbnail = ``
		this.views = 0
		this.resource = {
			keywords: []
		}
		this.settings = new ContentSettings()
	}

	authKey = String
	collectionId = Number
	contentType = String
	dateValidated = String
	description = String
	expired = Boolean
	fullVideo = Boolean
	id = Number
	isCopyrighted = Boolean
	name = String
	physicalCopyExists = Boolean
	published = Boolean
	requester = String
	resourceId = String
	thumbnail = String
	views = Number
	resource = {
		keywords: []
	}
	settings = new ContentSettings()
}
