
const ContentThumbnails = (() => {

	const thumbnailMap = {
		"video"(c) {
			return !!c.thumbnail ? c.thumbnail : `${process.env.REACT_APP_YVIDEO_SERVER}/assets/images/videos/placeholder.jpg`
		},
		"image"(c) {
			return c.thumbnail
		},
		"audio"(c) {
			return !!c.thumbnail ? c.thumbnail : `${process.env.REACT_APP_YVIDEO_SERVER}/assets/images/audio/placeholder.jpg`
		},
		"text"(c) {
			return !!c.thumbnail ? c.thumbnail : `${process.env.REACT_APP_YVIDEO_SERVER}/assets/images/text/placeholder.jpg`
		}
	}

	return {
		resolve(content) {
			return thumbnailMap[content.contentType](content)
		}
	}
})()

export default ContentThumbnails
