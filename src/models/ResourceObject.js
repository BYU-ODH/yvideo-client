export default class ResourceObject {

	id
	copyrighted
	resourceName
	physicalCopyExists
	published
	views
	fullVideo
	metadata
	requesterEmail
	allFileVersions
	resourceType
	dateValidated
	files

	constructor(obj) {

		this.id = obj[`id`]
		this.copyrighted = obj[`copyrighted`]
		this.resourceName = obj[`resource-name`]
		this.physicalCopyExists = obj[`physical-copy-exists`]
		this.published = obj[`published`]
		this.views = obj[`views`]
		this.fullVideo = obj[`full-video`]
		this.metadata = obj[`metadata`]
		this.requesterEmail = obj[`requester-email`]
		this.allFileVersions = obj[`all-file-versions`]
		this.resourceType = obj[`resource-type`]
		this.dateValidated = obj[`date-validated`]
	}
}