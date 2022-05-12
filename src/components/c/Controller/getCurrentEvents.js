import Position from './censorPosition'
const handleBlank = (blanks) => {
	const blankContainer = document.getElementById(`blank`)
	const blank = document.getElementById(`blankBox`)
	if (blanks.length > 0){
		if (!blank){
			const blank = document.createElement(`div`)
			blank.setAttribute(`id`,`blankBox`)
			blankContainer.appendChild(blank)
		}
	}else{
		const blankBox = document.getElementById(`blankBox`)
		if (blankBox)
			blankBox.remove()

	}
}
export const HandleSubtitle = (time,subtitles,ind) => {
	const subtitleNode = document.getElementById(`subtitle`)
	const currentsub = subtitles[ind]
	const text = () => {
		let subtext = ``
		const filtered = currentsub.filter(val => time < val.end && time > val.start)
		if (filtered.length > 0) subtext = filtered[0].text
		return subtext
	}
	subtitleNode.innerHTML = text
}
export const CurrentEvents = (time,events,duration) => {
	const activeEvents = []
	events.forEach((val,ind)=>{
		const start = val.start
		const end = val.end
		if (time >= start && time <= end) activeEvents.push(val)
	})
	const censors = activeEvents.filter(val => val.type === `Censor`)
	const comments = activeEvents.filter(val => val.type === `Comment`)
	const censorValues = []

	censors.forEach((val,ind)=>{

		censorValues.push(Position(val.position,time))
	})
	const blanks = activeEvents.filter(val => val.type === `Blank`)
	handleBlank(blanks)
	const censorContainer = document.getElementById(`censorContainer`)
	if (censorContainer){
		const censorChildren = censorContainer.children
		for (let i = 0; i<censorValues.length; i++){
			let exists = false
			for (let x = 0; x < censorChildren.length; x++)
				if (censorChildren[i]) exists = true

			if (!exists){
				const cen = document.createElement(`div`)
				cen.setAttribute(`class`,`censorBox`)
				cen.setAttribute(`id`,`censorBox-${i}`)
				const can =document.createElement(`canvas`)
				cen.appendChild(can)
				censorContainer.appendChild(cen)
			}
		}
		// destroy any that shouldn't be there
		if (censorChildren.length > censorValues.length){
			for (let x = 0; x < censorChildren.length; x++){
				let del = true
				for (let i; i < comments.length;i++)
					if (censorChildren[i].className.search(i.toString()) < -1) del = false
				if (del)
					censorContainer.removeChild(censorChildren[x])

			}
		}
	}

	const commentContainer = document.getElementById(`commentContainer`)
	if (commentContainer){
		const commentChildren = commentContainer.children
		for (let i = 0; i<comments.length; i++){
			let exists = false
			for (let x = 0; x < commentChildren.length; x++)
				if (commentChildren[i]) exists = true
			if (!exists){
				const com = document.createElement(`div`)
				com.setAttribute(`class`,`comment`)
				com.setAttribute(`id`,`comment-${i}`)
				com.innerHTML = comments[i].comment
				commentContainer.appendChild(com)
			}
		}
		// destroy any that shouldn't be there
		if (commentChildren.length > comments.length){
			for (let x = 0; x < commentChildren.length; x++){ // TODO I'm changing this because I don't think it should have a comma
				let del = true																	 // It used to be x < commentChildren.length, x++;)
				for (let i; i < comments.length;i++)
					if (commentChildren[i].className.search(i.toString()) < -1) del = false

				if (del) commentContainer.removeChild(commentChildren[x])
			}
		}
	}
	// Create Blank

	const eventValues = {
		allEvents: activeEvents,
		censors: censorValues,
		comments,
	}
	return eventValues
}
export const CensorChange = (ind,censorData, playedSeconds) =>{

	const censorBox = document.getElementById(`censorBox-${ind}`)
	if(!censorBox) return
	const width = censorData.top1 + censorData.top2 !== 0 ? censorData.width1+(playedSeconds-censorData.previous)/(censorData.next-censorData.previous)*(censorData.width2-censorData.width1) : 0
	censorBox.style.width = `${width}%`
	const height = censorData.top1 + censorData.top2 !== 0 ? censorData.height1+(playedSeconds-censorData.previous)/(censorData.next-censorData.previous)*(censorData.height2-censorData.height1) : 0
	censorBox.style.height = `${height}%`
	censorBox.style.top = censorData.top1 + censorData.top2 !== 0 ? `${censorData.top1-height/2+(playedSeconds-censorData.previous)/(censorData.next-censorData.previous)*(censorData.top2-censorData.top1)}%` : `0%`
	censorBox.style.left = censorData.left1 + censorData.left2 !== 0 ? `${censorData.left1-width/2+(playedSeconds-censorData.previous)/(censorData.next-censorData.previous)*(censorData.left2-censorData.left1)}%` : `0%`
}
export const CommentChange = (ind,commentData, playedSeconds) =>{
	if(document.getElementById(`comment-${ind}`)){
		const commentBox = document.getElementById(`comment-${ind}`)
		commentBox.style.top = `${commentData.y}%`
		commentBox.style.left = `${commentData.x}%`
	}
}
export const subtitleChange = (subtitles) => {
	if(document.getElementById(`subtitleContainer`)){
		const container = document.getElementById(`subtitleContainer`) // eslint-disable-line no-unused-vars
	}
}