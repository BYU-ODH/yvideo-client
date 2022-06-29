import Position from './censorPosition'
const handleBlank = (blanks) => {
	const blankContainer = document.getElementById(`blank`)
	const blank = document.getElementById(`blankBox`)
	if (blanks.length > 0){
		if (!blank){
			const blank = document.createElement(`div`)
			blank.setAttribute(`id`, `blankBox`)
			blankContainer.appendChild(blank)
		}
	}else{
		const blankBox = document.getElementById(`blankBox`)
		if (blankBox)
			blankBox.remove()

	}
}
export const HandleSubtitle = (time, subtitles, ind, duration) => {
	const tempOnload = window.onload
	window.onload = () => {
		const subtitleNode = document.getElementById(`subtitle`)
		const currentsub = subtitles.content
		let subtext = ``
		const filtered =
			currentsub !== undefined ?
				currentsub.filter(val => time < val.end && time > val.start)
				: []

		if (filtered.length > 0) subtext = filtered[0].text
		subtitleNode.innerHTML = subtext
		window.onload = tempOnload
	}
}
export const CurrentEvents = (time, events, duration) => {
	const activeEvents = []
	const doneEvents = []
	events.forEach((val, ind)=>{
		const newVal = {...val}
		const start = val.start
		const end = val.end || val.start + 0.5
		newVal.start = start
		newVal.end = end

		if (time >= start && time <= end)
			activeEvents.push(newVal)
		else if (time > end)
			doneEvents.push(newVal)
	})
	const censors = activeEvents.filter(val => val.type === `Censor`)
	const comments = activeEvents.filter(val => val.type === `Comment`)
	const censorValues = []

	censors.forEach((val, ind)=>{
		censorValues.push(Position(val.position, time))
	})
	const blanks = activeEvents.filter(val => val.type === `Blank`)
	handleBlank(blanks)
	const censorContainer = document.getElementById(`censorContainer`)
	if (censorContainer){
		const censorChildren = censorContainer.children
		for (let i = 0; i<censorValues.length; i++){
			// MATCH CENSOR VALUES BY UNIQUE IDENTIFIER NOT INDEX
			// IF WE TAKE THE NEXT VALUE INTO ACCOUNT EACH CENSOR VALUE HAS A UNIQUE NEXT
			const left1Value =
				censorValues[i].left1 !== undefined ?
					censorValues[i].left1.toFixed(2)
					:
					undefined

			if(document.getElementById(`censorBox-${censorValues[i].next}-${left1Value}`) === null){
				// if the censor does not exist we create a new one
				const cen = document.createElement(`div`)
				cen.setAttribute(`class`, `censorBox`)
				cen.setAttribute(`id`, `censorBox-${censorValues[i].next}-${left1Value}`)
				const can = document.createElement(`canvas`)
				cen.appendChild(can)
				censorContainer.appendChild(cen)
			}
		}
		// destroy any that shouldn't be there
		if (censorChildren.length > censorValues.length){
			// console.log('Destroying censor box')
			for (let x = 0; x < censorChildren.length; x++){
				// loop through all the childs and try to match then to the censor values
				// if it matches then good. if it doesn't remove such child
				const childUniqueId =
					censorChildren[x].id !== undefined ?
						censorChildren[x].id.replace(/[^0-9.]/g, ``)
						:
						undefined

				let del = true
				for (let i = 0; i < censorValues.length; i++){
					const left1Value =
						censorValues[i].left1 !== undefined ?
							censorValues[i].left1.toFixed(2)
							:
							undefined

					const uniqueId = `${censorValues[i].next}${left1Value}`

					if(uniqueId === childUniqueId)
						del = false
				}

				if(del)
					censorContainer.removeChild(censorChildren[x])

			}
		}

		if(time === duration){
			while (censorContainer.firstChild)
				censorContainer.removeChild(censorContainer.firstChild)
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
				com.setAttribute(`class`, `comment`)
				com.setAttribute(`id`, `comment-${i}`)
				com.innerHTML = comments[i].comment
				commentContainer.appendChild(com)
			}
		}
		// destroy any that shouldn't be there
		if (commentChildren.length > comments.length){
			for (let x = 0; x < commentChildren.length; x++){
				let del = true
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
		doneEvents,
	}
	return eventValues
}
export const CensorChange = async (ind, censorData, playedSeconds) =>{
	const dataLeft1Value =
		censorData.left1 !== undefined ?
			censorData.left1.toFixed(2)
			:
			undefined

	if(document.getElementById(`censorBox-${censorData.next}-${dataLeft1Value}`)){
		const censorBox = document.getElementById(`censorBox-${censorData.next}-${dataLeft1Value}`)
		let width = 0
		let height = 0
		let top = 0
		let left = 0
		if(censorData.previous !== undefined && censorData.next !== undefined){
			width =
			censorData.top1 + censorData.top2 !== 0 ?
				censorData.width1 + (playedSeconds-censorData.previous) / (censorData.next-censorData.previous) * (censorData.width2-censorData.width1)
				: 0

			censorBox.style.width = `${width}%`
			height =
			censorData.top1 + censorData.top2 !== 0 ?
				censorData.height1 + (playedSeconds-censorData.previous) / (censorData.next-censorData.previous) * (censorData.height2-censorData.height1)
				: 0

			top =
			censorData.top1 + censorData.top2 !== 0 ?
				censorData.top1-height / 2 + (playedSeconds - censorData.previous) / (censorData.next - censorData.previous) * (censorData.top2 - censorData.top1)
				: 0

			left =
			censorData.left1 + censorData.left2 !== 0 ?
				censorData.left1 - width/2 + (playedSeconds - censorData.previous) / (censorData.next - censorData.previous) * (censorData.left2 - censorData.left1)
				: 0
		}else if(typeof censorData.previous === `undefined` || typeof censorData.next === `undefined`){
			width = censorData.width1
			height = censorData.height1
			top = censorData.top1 - height / 2
			left = censorData.left1 - width / 2
		}
		censorBox.style.top = `${`${top}%`}`
		censorBox.style.left = `${`${left}%`}`
		censorBox.style.height = `${height}%`
		censorBox.style.width = `${width}%`
	}
}
export const CommentChange = (ind, commentData, playedSeconds) =>{
	if(document.getElementById(`comment-${ind}`)){
		const commentBox = document.getElementById(`comment-${ind}`)
		commentBox.style.top = `${commentData.y}%`
		commentBox.style.left = `${commentData.x}%`
	}
}
export const subtitleChange = (subtitles) => {
	if(document.getElementById(`subtitleContainer`)){
		// eslint-disable-next-line no-unused-vars
		const container = document.getElementById(`subtitleContainer`)
	}
}
