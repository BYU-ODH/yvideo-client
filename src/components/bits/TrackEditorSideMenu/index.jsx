import React, { useState, useEffect } from 'react'

import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'

import plus from 'assets/plus-square.svg'

import Style, {Icon} from './styles.js'

const TrackEditorSideMenu = props => {

	const {
		singleEvent,
		index,
		deleteEvent,
		updateEvents,
		videoLength,
		closeSideEditor,
		isSub,
		updateSubs,
		subs,
		changeSubIndex,
		addSub,
		subLayer,
		updateLanguage,
		updateTitle,
		editCensor,
		handleEditCensor,
		handleCensorRemove,
		handleAddCensor,
		handleSaveCensor,
	} = props

	const [event, setEvent] = useState(singleEvent)
	const [editComment, setEditComment] = useState({})
	const [subText, setSubText] = useState([])
	const [language, setLanguage] = useState(``)
	const [title, setTitle] = useState(``)
	useEffect(() => {
		setEvent(singleEvent)
	}, [index])

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
		// console.log(number)
		cEvent.end = number

		setEvent(cEvent)
		updateEvents(index, cEvent, layer)
	}

	const handleSaveComment = () => {
		const ind = index
		let cEvent = event
		const layer = cEvent.layer
		cEvent = editComment

		// console.log(event)

		// setEditComment({})
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
	const editSub = (side, time, value,layer) => {
		console.log(time)
		const sub = {...event}
		if (side === `beg`)
			sub.start = time / videoLength * 100
		else if(side === `end`)
			sub.end = time / videoLength * 100
		setSubText(value)
		try{
			if(value.target)
				sub.text = value.target.value

		}catch(error){

		}
		console.log(`why is`,layer)
		setEvent(sub)
		updateSubs(index,sub,layer)
	}

	const start = (event.start / 100 * videoLength).toFixed(3) || undefined
	const end = (event.end / 100 * videoLength).toFixed(3) || undefined

	return (
		<Style>
			<div>
				<img className={`closeEditor`} src={`${closeIcon}`} onClick={closeSideEditor}/>
				{isSub ? (
					<>

						<div className='center'>
							<label>Title</label>
							<label>Language</label>
						</div>
						<div className='center'>
							<input type='text' className='sideTabInput' value={subs[subLayer].title} onChange={e => {
								updateTitle(e.target.value)
								setTitle(e.target.value)
							}
							}/>
							<input type='text' className='sideTabInput' value={subs[subLayer].language} onChange={e => {
								updateLanguage(e.target.value)
								setLanguage(e.target.value)
							}}/>
						</div>

					</>
				):``}
				{!isSub ? (
					<>
						<div className='center'>
							<label>Start</label>
							<label style={{ visibility: `${event.type !== `Pause` ? `visible` : `hidden`}`}}>End</label>
						</div>
						<div className='center'>
							<input type='text' className='sideTabInput' value={`${parseFloat(start).toFixed(0)}`} onChange={e => handleEditEventBTimeChange(e)}/>
							<input type='text' className='sideTabInput' value={`${parseFloat(end).toFixed(0)}`} onChange={e => handleEditEventETimeChange(e)} style={{ visibility: `${event.type !== `Pause` ? `visible` : `hidden`}`}}/>
						</div>
						<br/>
					</>
				):``}

			</div>
			{ event.type === `Comment` ? (
				<>
					<div className='center'>
						<label>X</label>
						<label>Y</label>
					</div>
					<div className='center'>
						<input type='number' className='sideTabInput' placeholder={event.position.x.toFixed(2)} onChange={e => handleEditComment(e.target.value, event, 1)}/>
						<input type='number' className='sideTabInput' placeholder={event.position.y.toFixed(2)} onChange={e => handleEditComment(e.target.value, event, 2)}/>
					</div>
					<div className='center' style={{ flexDirection: `column`}}>
						<label style={{ textAlign: `left`, margin: `15px 5px 5px 5px` }}>Type a comment</label>
						<textarea style={{ margin: `5%`, width: `90%`}} rows='4' cols='50' placeholder={event.comment} onChange={e => handleEditComment(e.target.value, event, 3)}></textarea>
						<button onClick={handleSaveComment} className='sideButton'>Save Comment</button>
					</div>
				</>
			) : null
			}
			{ event.type === `Censor` ? (
				<div className='censorMenu'>
					<label>Censor Times</label><br/><br/>
					<table className='tableHeader'>
						<thead>
							<tr>
								<th align='center'>Time</th>
								<th align='center'>X</th>
								<th align='center'>Y</th>
								<th align='center'>Width</th>
								<th align='center'>Height</th>
								<th align='center'>&nbsp;</th>
							</tr>
						</thead>
					</table>
					<div className='censorList'>
						<table>
							<tbody>
								{event.type === `Censor`?
									Object.keys(event.position).sort((a, b) => parseFloat(a) > parseFloat(b) ? 1 : -1).map((item, i) => (
										<tr key={item}>
											<td><input type='number' value={`${item}`}/></td>
											<td><input type='number' placeholder={`${event.position[item][0]}`} onChange={(e) => handleEditCensor(e, item, 1)}/></td>
											<td><input type='number' placeholder={`${event.position[item][1]}`} onChange={(e) => handleEditCensor(e, item, 2)}/></td>
											<td><input type='number' placeholder={`${event.position[item][2]}`} onChange={(e) => handleEditCensor(e, item, 3)}/></td>
											<td><input type='number' placeholder={`${event.position[item][3]}`} onChange={(e) => handleEditCensor(e, item, 4)}/></td>
											<td><img className={`trashIcon`} src={`${trashIcon}`} onClick={() => handleCensorRemove(item)}/></td>
										</tr>
									))
									:``}
								{
									// "foo: bar", "baz: 42"
								// Object.entries(event.position).forEach(([key, value]) => console.log(`${key}: ${value}`)) // "foo: bar", "baz: 42"
								}
							</tbody>
						</table>
						<div id='loader' style={{visibility: `hidden`}}>Loading</div><br/><br/>
						<div id='tableBottom' style={{ width: `90%`, marginLeft: `0px` }}></div>
					</div>

					<button className='addCensor' onClick={handleAddCensor}><Icon src={plus}/></button><br/><br/><br/><br/>
					<button className='sideButton' onClick={handleSaveCensor}>Save Censor</button>
				</div>
			) : null
			}
			<br/>
			<p id='sideTabMessage'></p>
			<p id='sideTabExplanation'></p>
			{
				isSub ?(
					<div style={{overflowY:`scroll`, height:`40vh`}}>
						<p className={`subTitleCard`} >All Subtitles</p>
						<table>
							<tr>
								<td>
									<div style={{width:`8rem`}}>
										<label>Start</label>
									</div>
								</td>
								<td>
									<div style={{width:`8rem`}}>
										<label>End</label>
									</div>
								</td>
								<td>
									<div style={{width:`8rem`}}>
										<label>Text</label>
									</div>
								</td>
							</tr>
						</table>
						<table>
							{/* content is a string type. Maybe change to an array by parsing content? */}
							{subs[subLayer][`content`].map((sub,ind)=>(
								<div className={`${ind === index ? `subActive`:``}`}>
									<tr style={{width: `100%`}} className={`${ind === index ? `subActive`:``}`}>
										<td>
											<input onClick={()=>changeSubIndex(ind)} style={{width: `7rem`}} type='number' value={`${(sub.start/ 100 * videoLength).toFixed(0)}`} onChange={e => editSub(`beg`,e.target.value,null,subLayer)}/>
										</td>
										<td>
											<input onClick={()=>changeSubIndex(ind)} style={{width: `7rem`}} type='number' value={`${(sub.end/ 100 * videoLength).toFixed(0)}`} onChange={e => editSub(`end`,e.target.value,null,subLayer)}/>
										</td>
										<td>
											<input onClick={()=>changeSubIndex(ind)} style={{width: `14rem`}} type='text' value={sub.text} onChange={value=>{
												// const text = subText
												// text[ind] = value
												// setSubText(text)
												editSub(null,null,value,subLayer)
											}} />
										</td>
									</tr>
								</div>
							// <div className={`subCard ${ind === index ? `subActive`:``}`} onClick={()=>changeSubIndex(ind)} key={ind}>
							// 	<p>
							// 		{sub.text}
							// 	</p>
							// </div>
							))}
						</table>
						<Icon src={plus} onClick={()=>addSub(null,subLayer)} />
					</div>
				) :``
			}
		</Style>
	)
}

export default TrackEditorSideMenu