import React, { useState, useEffect } from 'react'

import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'

import plus from 'assets/plus-square.svg'

import Style, {Icon} from './styles.js'

const SubtitleEditorSideMenu = props => {

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

	}, [index, event])

	const editSub = (side, time, value, layer, ind) => {
		const sub = {...event}

		if (side === `beg`) {
			if(time===``){
				sub.start=``
			}else {
				sub.start = time / videoLength * 100
			}
			sub.end = subs[layer][`content`][ind].end
			sub.text = subs[layer][`content`][ind].text

		} else if(side === `end`) {
			sub.start = subs[layer][`content`][ind].start
			if(time===``){
				sub.end=``
			}else {
				sub.end = time / videoLength * 100
			}
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

	const ConsoleLog = ({ children }) => {
		console.log(children)
		return false
	}

	return (
		<Style>
			<div>
				<img alt={`closeEditor`} className={`closeEditor`} src={`${closeIcon}`} onClick={closeSideEditor}/>
			</div>

			<div className={`allSubs`} style={{overflowY:`scroll`, height:`40vh`}}>
				{
					subs[subLayer] !== undefined &&
						subs[subLayer][`content`].length ===0 &&
							<Icon className={`initial`} src={plus} onClick={()=>addSub(subLayer,0,`top`)} />}
				{subs[subLayer][`content`].map((sub,ind)=>(
					<div className={`container`}>
						{
							subs[subLayer][`content`][0].start > 0.11 && ind===0 &&
								<Icon src={plus} index={ind} onClick={()=>addSub(subLayer,ind,`top`)} />
						}
						<div className={`subContainer ${ind === index ? `subActive`:``}`}>
							<textarea className={`subText`} type='text' onClick={()=>changeSubIndex(ind)} value={sub.text} onChange={(value)=>editSub(null,null,value,subLayer,ind)}></textarea>
							<div id={`${ind === index ? `subStartEnd`: ``}`} className={`subStartEnd`}>
								<input id={`${ind === index&&focus ? `focus`: ind === index?`subStart`: ``}`} className={`subStart sideTabInput`} onClick={()=>changeSubIndex(ind)} type='number' value={`${sub.start ===``? ``:(sub.start/ 100 * videoLength).toFixed(0)}`} onChange={e => editSub(`beg`,e.target.value,null,subLayer,ind)}/>
								<input id={`${ind === index&&focus ? `focus`: ind === index?`subEnd`: ``}`} className={`subEnd`} onClick={()=>changeSubIndex(ind)} type='number' value={`${sub.end ===``? ``:(sub.end/ 100 * videoLength).toFixed(0)}`} onChange={e => editSub(`end`,e.target.value,null,subLayer,ind)}/>
							</div>
							<img alt={`delete subtitle`} className={`subtitle-delete`} src={trashIcon} width='20px' onClick={() => deleteSub(ind)} />
						</div>
						{
							ind === subs[subLayer][`content`].length-1 ?
								(subs[subLayer][`content`][ind].end/ 100 * videoLength).toFixed(0) - videoLength !== 0 &&
									<Icon className={`hide`} src={plus} ind={ind} index={index} onClick={()=>addSub(subLayer,ind,`button`)} />
								:
								(subs[subLayer][`content`][ind+1].start/ 100 * videoLength).toFixed(0)-(subs[subLayer][`content`][ind].end/ 100 * videoLength).toFixed(0) !== 0 &&
									<Icon className={`hide`} src={plus} ind={ind} index={index} onClick={()=>addSub(subLayer,ind,`button`)} />
						}
					</div>
				))}
			</div>
		</Style>
	)
}

export default SubtitleEditorSideMenu