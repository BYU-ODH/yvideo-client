import { ResourceLibrary } from 'yvideojs'
import ContentRenderer from './ContentRenderer.js'
import axios from 'axios'

const ContentLoader = (() => {

	const getDocumentWhitelist = (args, type, ids) => {

		if (ids.length === 0) return Promise.resolve([])

		const data = {
			courseId: args.courseId || 1,
			contentId: args.contentId,
			permission: args.permission || `view`,
			documentType: type,
			ids: ids.join(`,`)
		}

		const formBody = Object.keys(data).map(key => encodeURIComponent(key) +
			`=` + encodeURIComponent(data[key])).join(`&`)

		return axios(`${process.env.REACT_APP_YVIDEO_SERVER}/ajax/permissionChecker`, {
			method: `post`,
			mode: `cors`,
			credentials: `include`,
			headers: {
				"Content-Type": `application/x-www-form-urlencoded`
			},
			body: formBody
		})
	}

	/* args: resource, courseId, contentId, permission */
	const getTranscriptWhitelist = args => {
		return getDocumentWhitelist(args,
			`captionTrack`,
			args.resource.getTranscriptIds())
	}

	/* args: resource, courseId, contentId, permission */
	const getAnnotationWhitelist = args => {
		return getDocumentWhitelist(args,
			`annotationDocument`,
			args.resource.getAnnotationIds())
	}

	const renderContent = args => {
		// Check if we are rendering something from the resource library
		if ([`video`, `audio`, `image`, `text`].indexOf(args.content.contentType) >= 0) {
			ResourceLibrary.setBaseUrl(`https://api.ayamel.org/api/v1/`)

			ResourceLibrary.load(args.content.resourceId, resource => {
				args.resource = resource
				ContentRenderer.render({
					getTranscriptWhitelist,
					getAnnotationWhitelist,
					resource,
					content: args.content,
					courseId: args.courseId,
					contentId: args.content.id,
					holder: args.holder,
					components: args.components,
					screenAdaption: args.screenAdaption,
					startTime: args.startTime,
					endTime: args.endTime,
					renderCue: args.renderCue,
					permission: args.permission,
					callback: args.callback
				})
			}).catch(err => console.log(err))
		} else if (args.content.contentType === `playlist`)
			console.error(`Playlists are not supported.`)

	}

	const castContentObject = content => {
		switch (typeof content) {
			case `number`:
				return axios(`/content/${content}/json?${Date.now().toString(36)}`)
			case `object`:
				return Promise.resolve(content)
			default:
				return Promise.reject(new Error(`Invalid Type`))
		}
	}

	return {
		castContentObject,
		render(args) {
			castContentObject(args.content).then((data) => {
				args.content = data
				renderContent(args)
			})
		}
	}
})()

export default ContentLoader
