export default class BackEndContent {

	backEndData = {
		"allow-definitions": true,
		"url": "string",
		"allow-captions": true,
		"content-type": "string",
		"resource-id": "string",
		"tags": "string",
		"thumbnail": "string",
		"file-version": "string",
		"collection-id": "string",
		"views": 0,
		"annotations": "string",
		"title": "string",
		"allow-notes": true,
		"description": "string"
	}

	constructor(obj){

		if(obj !== undefined){
			this.backEndData['id'] = obj.id
			this.backEndData['views'] = obj.views
			this.backEndData['collection-id']  = obj.collectionId
			this.backEndData['url'] = obj.url
			this.backEndData['content-type']  = obj.contentType
			this.backEndData['thumbnail'] = obj.thumbnail
			this.backEndData['description'] = obj.description
			this.backEndData['resource-id'] = obj.resourceId
			this.backEndData['title'] = obj.name

			this.backEndData['allow-definitions'] = obj.settings.allowDefinitions
			this.backEndData['allow-captions'] = obj.settings.allowCaptions

			this.backEndData['annotations'] =  this.arrayToString(obj.settings.annotationDocument)//settings

			this.backEndData['file-version'] = obj.settings.targetLanguages

			this.backEndData['tags'] = obj.resource.keywords.join("; ")
		}

	}

	arrayToString(array){
		let str = ''

		array.forEach(element => {
			str += `${JSON.stringify(element)}; `
		});

		return str
	}

}
