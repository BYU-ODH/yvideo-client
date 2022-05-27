export default class BackEndContent {

	backEndData = {
		"allow-definitions": true,
		"url": `string`,
		"allow-captions": true,
		"content-type": `string`,
		"resource-id": `string`,
		"tags": `string`,
		"thumbnail": `string`,
		"file-version": `string`,
		"file-id": `string`,
		"collection-id": `string`,
		"views": 0,
		"annotations": `string`,
		"title": `string`,
		"allow-notes": true,
		"description": `string`,
		"published": true,
		"clips": ``,
	}

	constructor(obj){

		if(obj !== undefined){
			this.backEndData[`id`] = obj.id
			this.backEndData[`views`] = obj.views
			this.backEndData[`collection-id`] = obj.collectionId
			this.backEndData[`url`] = obj.url
			this.backEndData[`content-type`] = obj.contentType
			this.backEndData[`thumbnail`] = obj.thumbnail
			this.backEndData[`description`] = obj.description
			this.backEndData[`resource-id`] = obj.resourceId
			this.backEndData[`title`] = obj.name
			this.backEndData[`published`] = obj.published
			this.backEndData[`clips`] = obj.clips

			this.backEndData[`allow-definitions`] = obj.settings.allowDefinitions
			this.backEndData[`allow-captions`] = obj.settings.showCaptions

			this.backEndData[`annotations`] = this.arrayToString(obj.settings.annotationDocument)// settings

			this.backEndData[`file-version`] = obj.settings.targetLanguage
			this.backEndData[`file-id`] = obj.fileId

			this.backEndData[`tags`] =
				obj.resource.keywords ?
					obj.resource.keywords.join(`; `)
					: ``

			this.backEndData[`words`] =
				obj.words ?
					obj.words.join(`; `)
					: ``

		}

	}

	arrayToString(array){

		if(!array) return ``

		return JSON.stringify(array)
	}

}
