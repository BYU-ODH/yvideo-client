import React, { useState, useEffect } from 'react'

import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'

import plus from 'assets/plus-square.svg'

import Style, {Icon} from './styles.js'

const TrackEditorSideMenu = props => {

	const {
		singleEvent,
		index,
		updateEvents,
		videoLength,
		closeSideEditor,
		isSub,
		updateSubs,
		subs,
		changeSubIndex,
		addSub,
		subLayer,
		updateTitle,
		handleEditCensor,
		handleCensorRemove,
		handleAddCensor,
		activeCensorPosition,
		setActiveCensorPosition,
		deleteSub,
		focus,
	} = props

	const [event, setEvent] = useState(singleEvent)
	const [editComment, setEditComment] = useState({})
	const [subText, setSubText] = useState([])

	useEffect(() => {
		setEvent(singleEvent)

		if(focus)
			document.getElementById(`focus`).focus()

		if(!event.type) {
			event.type = ``
			setEvent(event)
		}

	}, [index, event])

	const handleEditEventBTimeChange = (e) => {
		if (isSub){
			editSub(`beg`,e.target.value,subText)
			return
		}
		document.getElementById(`sideTabMessage`).style.color=`red`
		let number = parseFloat(e.target.value)
		const cEvent = event
		const layer = cEvent.layer

		if(isNaN(number))
			number = 0

		number = number / videoLength * 100

		cEvent.start = number

		setEvent(cEvent)
		updateEvents(index, cEvent, layer)
	}

	const handleEditEventETimeChange = (e) => {
		if (isSub){
			editSub(`end`,e.target.value,subText)
			return
		}
		document.getElementById(`sideTabMessage`).style.color=`red`
		let number = parseFloat(e.target.value)
		const cEvent = event
		const layer = cEvent.layer

		if(isNaN(number))
			number = 0

		number = number / videoLength * 100
		cEvent.end = number

		setEvent(cEvent)
		updateEvents(index, cEvent, layer)
	}

	const handleSaveComment = () => {
		const ind = index
		const cEvent = event
		const layer = cEvent.layer
		cEvent.position = editComment.position === undefined ? cEvent.position : editComment.position
		cEvent.comment = editComment.comment === undefined ? cEvent.comment : editComment.comment

		updateEvents(ind, cEvent, layer)
	}

	const handleEditComment = (value, cEvent, int) => {

		switch (int) {
		case 1:
			if(editComment.position !== undefined)
				setEditComment({...editComment, position: { x: parseInt(value), y: editComment.position.y }})
			else
				setEditComment({...cEvent, position: { x: parseInt(value), y: cEvent.position.y }})

			break
		case 2:
			if(editComment.position !== undefined)
				setEditComment({...editComment, position: { x: editComment.position.x, y: parseInt(value) }})
			else
				setEditComment({...cEvent, position: { x: cEvent.position.x, y: parseInt(value) }})

			break
		case 3:
			if(editComment.position !== undefined)
				setEditComment({...editComment, comment: value })
			else
				setEditComment({...cEvent, comment: value })

			break

		default:
			break
		}
	}

	const editSub = (side, time, value, layer, ind) => {

		const sub = {...event}
		// console.log(subs)
		if (side === `beg`) {
			sub.start = time / videoLength * 100
			sub.end = subs[layer][`content`][ind].end
			sub.text = subs[layer][`content`][ind].text

		} else if(side === `end`) {
			sub.start = subs[layer][`content`][ind].start
			sub.end = time / videoLength * 100
			sub.text = subs[layer][`content`][ind].text
		} else {
			if(value)
				setSubText(value)
		}

		try{
			if(!side) {
				sub.text = value.target.value
				sub.start = subs[layer][`content`][ind].start
				sub.end = subs[layer][`content`][ind].end
			}

		}catch(error){
			console.log(error)
		}

		setEvent(sub)
		updateSubs(ind,sub,layer)
	}

	const handleChange = (e) => {
		this.setState({inputValue: e.target.value})
	}

	const ConsoleLog = ({ children }) => {
		console.log(children)
		return false
	}

	return (
		<Style>
			<div>
				<img alt={`closeEditor`} className={`closeEditor`} src={`${closeIcon}`} onClick={closeSideEditor}/>
			</div>
			<button className={`addSubTitle`} onClick={()=>addSub(subLayer,subs[subLayer][`content`].length-1,`button`)} >Add a subtile</button>
			<div className={`allSubs`} style={{overflowY:`scroll`, height:`40vh`}}>
				{subs[subLayer][`content`].map((sub,ind)=>(
					<div className={`container`} style={{ marginTop: `${ind === 0 ? `1rem`:``}`}}>
						<Icon src={plus} style={{ display: `${ind === 0 ? `block`:`none`}`}} index={ind} onClick={()=>addSub(subLayer,ind,`top`)} />
						<div className={`subContainer ${ind === index ? `subActive`:``}`}>
							<textarea className={`subText`} type='text' onClick={()=>changeSubIndex(ind)} value={sub.text} onChange={(value)=>editSub(null,null,value,subLayer,ind)}></textarea>
							<div id={`${ind === index ? `subStartEnd`: ``}`} className={`subStartEnd`}>
								<input id={`${ind === index&&focus ? `focus`: ind === index?`subStart`: ``}`} className={`subStart sideTabInput`} onClick={()=>changeSubIndex(ind)} type='number' value={`${(sub.start/ 100 * videoLength).toFixed(0)}`} onChange={e => editSub(`beg`,e.target.value,null,subLayer,ind)}/>
								<input id={`${ind === index ? `subEnd`: ``}`} className={`subEnd`} onClick={()=>changeSubIndex(ind)} type='number' value={`${(sub.end/ 100 * videoLength).toFixed(0)}`} onChange={e => editSub(`end`,e.target.value,null,subLayer,ind)}/>
							</div>
							<img alt={`delete subtitle`} className={`subtitle-delete`} src={trashIcon} width='20px' onClick={() => deleteSub(ind)} />
						</div>
						<Icon className={`hide`} src={plus} style={{ display: `block`}} ind={ind} index={index} onClick={()=>addSub(subLayer,ind,`button`)} />
					</div>
				))}
			</div>
		</Style>
	)
}

export default TrackEditorSideMenu