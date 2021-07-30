import React, { useState, useEffect } from 'react'

import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'

import plus from 'assets/plus-circle.svg'

import Style, {Icon} from './styles.js'

const SubtitleEditorSideMenu = props => {

	const {
		singleEvent,
		index,
		videoLength,
		closeSideEditor,
		updateSubs,
		subs,
		changeSubIndex,
		addSub,
		subLayer,
		deleteSub,
		focus,
		disableSave,
	} = props

	const [event, setEvent] = useState(singleEvent)

	useEffect(() => {
		setEvent(singleEvent)

		if(focus)
			document.getElementById(`focus`).focus()

	}, [index, event])

	const editSub = (side, time, value, layer, ind) => {
		const sub = {...event}

		if (side === `beg`) {
			if(time===``)
				sub.start=``
			else
				sub.start = time / videoLength * 100

			sub.end = subs[layer][`content`][ind].end
			sub.text = subs[layer][`content`][ind].text

		} else if(side === `end`) {
			sub.start = subs[layer][`content`][ind].start
			if(time===``)
				sub.end=``
			else
				sub.end = time / videoLength * 100

			sub.text = subs[layer][`content`][ind].text

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
		updateSubs(ind,sub,layer,side)
	}

	return (
		<Style>
			<div>
				<img alt={`closeEditor`} className={`closeEditor`} src={`${closeIcon}`} onClick={closeSideEditor}/>
			</div>

			<div className={`allSubs`} style={{overflowY:`scroll`, height:`68vh`}}>
				<Icon id={`initial`} className={`initial`} src={plus} onClick={()=>addSub(subLayer,0,`top`)}
					visibility={subs[subLayer] !== undefined && subs[subLayer][`content`].length ===0 && disableSave===false ? `visible`: `hidden`}
				/>
				{subs[subLayer][`content`].map((sub,ind)=>(
					<div>
						<div className={`container`}>
							<Icon src={plus} ind={ind} onClick={()=>addSub(subLayer,ind,`top`)}
								position={`top`}
								visibility={subs[subLayer][`content`][0].start > 0.11 && ind===0 && disableSave===false ? `visible`: `hidden`}
							/>
							<div id={`subContainer${ind}`} className={`subContainer ${ind === index ? `subActive`:``}`}>
								<textarea className={`subText`} type='text' onClick={()=>changeSubIndex(ind)} value={sub.text} onChange={(value)=>editSub(null,null,value,subLayer,ind)}></textarea>
								<div id={`${ind === index ? `subStartEnd`: ``}`} className={`subStartEnd`}>
									<input id={`subStart${ind}`} className={`subStart sideTabInput`} onClick={()=>changeSubIndex(ind)} type='number' value={`${sub.start ===``? ``:(sub.start/ 100 * videoLength).toFixed(0)}`} onChange={e => editSub(`beg`,e.target.value,null,subLayer,ind)}/>
									<input id={`subEnd${ind}`} className={`subEnd`} onClick={()=>changeSubIndex(ind)} type='number' value={`${sub.end ===``? ``:(sub.end/ 100 * videoLength).toFixed(0)}`} onChange={e => editSub(`end`,e.target.value,null,subLayer,ind)}/>
								</div>
								<img alt={`delete subtitle`} className={`subtitle-delete`} src={trashIcon} width='20px' onClick={() => deleteSub(ind)} />
							</div>
						</div>
						{
							ind === subs[subLayer][`content`].length-1 ?
								<Icon id={`icon${ind}`} src={plus} ind={ind} onClick={()=>addSub(subLayer,ind,`button`)}
									visibility={
										(subs[subLayer][`content`][ind].end/ 100 * videoLength).toFixed(0) - videoLength < 0 && disableSave===false
											? `visible`: `hidden`
									}
									active={ind === index ? `subActive`:`nonActive`}
								/>
								:
								<Icon id={`icon${ind}`} src={plus} ind={ind} onClick={()=>addSub(subLayer,ind,`button`)}
									visibility={
										(subs[subLayer][`content`][ind+1].start/ 100 * videoLength).toFixed(0)-(subs[subLayer][`content`][ind].end/ 100 * videoLength).toFixed(0) !== 0 && disableSave===false
											? `visible`: `hidden`
									}
									active={ind === index ? `subActive`:`nonActive`}
								/>
						}
					</div>
				))}
			</div>
		</Style>
	)
}

export default SubtitleEditorSideMenu