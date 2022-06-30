import React, { useState, useEffect } from 'react'

import trashIcon from 'assets/trash_icon.svg'
import closeIcon from 'assets/close_icon.svg'
import plus from 'assets/plus-circle.svg'
import Style, {Icon} from './styles.js'

import { convertSecondsToMinute } from '../../common/timeConversion'

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
		scrollRef,
		handleShowTip,
		toggleTip,
	} = props

	const [event, setEvent] = useState(singleEvent)

	useEffect(() => {
		setEvent(singleEvent)

		if(focus)
			document.getElementById(`focus`).focus()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index, event])
	const editSub = (side, time, value, layer, ind, type) => {
		const sub = {...event}
		if (side === `beg`) {
			if(time===``)
				sub.start=``
			else
				sub.start = time

			sub.end = subs[layer][`content`][ind].end
			sub.text = subs[layer][`content`][ind].text

		} else if(side === `end`) {
			sub.start = subs[layer][`content`][ind].start
			if(time===``)
				sub.end=``
			else
				sub.end = time

			sub.text = subs[layer][`content`][ind].text
		}

		try{
			if(!side) {
				sub.text = value.target.value
				sub.start = subs[layer][`content`][ind].start
				sub.end = subs[layer][`content`][ind].end
			}
		}catch(error){
			console.log(error) // eslint-disable-line no-console
		}
		setEvent(sub)
		updateSubs(ind, sub, layer, side, type)
	}

	return (
		<Style id='subtitleEditorSideMenu'>
			<div>
				<img alt={`closeEditor`} className={`closeEditor`} src={`${closeIcon}`} onClick={closeSideEditor}/>
			</div>

			<div id = {`allSubs`} className={`allSubs`} ref={scrollRef} style={{overflowY:`scroll`, height:`68vh`}}>
				<Icon id={`initial`} className={`initial`} src={plus} onClick={()=>addSub(subLayer, 0, `top`)}
					visibility={subs[subLayer] !== undefined && subs[subLayer][`content`].length === 0 && disableSave === false ? `visible`: `hidden`}
				/>
				{subs[subLayer][`content`].map((sub, ind) => (
					<div id={`sub-${subLayer}-${ind}`} key={ind}>
						<div className={`container`}>
							{/* This toggles the z-index of the icons as the state for the submodal changes */}
							<Icon className={`IconMiddle`} src={plus} ind={ind} onClick={()=>addSub(subLayer, ind, `top`)}
								position={`top`}
								visibility={subs[subLayer][`content`][0].start > 0.01 && ind === 0 && disableSave === false ? `visible` : `hidden`}
							/>
							<div id={`subContainer${ind}`} className={`subContainer ${ind === index && `subActive`}`}>
								<textarea
									className='subText'
									type='text'
									onClick={ () => changeSubIndex(ind)}
									value={sub.text}
									onChange={ (value) => editSub(null, null, value, subLayer, ind)} />
								<div id={`${ind === index && `subStartEnd`}`} className={`subStartEnd`}>
									<input
										id={`subStart${ind}`}
										className={`subStart sideTabInput`}
										type='text'
										value={`${sub.start === `` ? `` : convertSecondsToMinute(sub.start, videoLength)}`}
										onClick={ () => changeSubIndex(ind)}
										onChange={e => editSub(`beg`, e.target.value, null, subLayer, ind, null)}
										onBlur={e => editSub(`beg`, e.target.value, null, subLayer, ind, `onBlur`)}
										onMouseEnter={e => handleShowTip(`${videoLength < 3600 ? `MMSSMS` : `HMMSSMS`}`,
											{
												x: e.target.getBoundingClientRect().x + 30,
												y: e.target.getBoundingClientRect().y + 15,
												width: e.currentTarget.offsetWidth + 20,
											})
										}
										onMouseLeave={() => toggleTip()}

									/>
									<input
										id={`subEnd${ind}`}
										className={`subEnd`}
										type='text'
										value={`${sub.end ===`` ? `` : convertSecondsToMinute(sub.end, videoLength)}`}
										onClick={ () => changeSubIndex(ind) }
										onChange={e => editSub(`end`, e.target.value, null, subLayer, ind, null)}
										onBlur={e => editSub(`end`, e.target.value, null, subLayer, ind, `onBlur`)}
										onMouseEnter={e => handleShowTip(`${videoLength < 3600 ? `MMSSMS` : `HMMSSMS`}`,
											{
												x: e.target.getBoundingClientRect().x + 30,
												y: e.target.getBoundingClientRect().y + 15,
												width: e.currentTarget.offsetWidth + 20,
											})
										}
										onMouseLeave={() => toggleTip()}
									/>
								</div>
								<img alt={`delete subtitle`} className={`subtitle-delete`} src={trashIcon} width='20px' onClick={() => deleteSub(ind)} />
							</div>
						</div>
						{
							ind === subs[subLayer][`content`].length-1 ?
								<Icon className='iconBottom' id={`icon${ind}`} src={plus} ind={ind} onClick={ () => addSub(subLayer, ind, `button`) }
									visibility={ subs[subLayer][`content`][ind].end - videoLength < 0.00 && disableSave === false ?
										`visible`
										:
										`hidden`
									}
									active={ind === index ? `subActive` : `nonActive`}
								/>
								:
								<Icon className='iconBottom' id={`icon${ind}`} src={plus} ind={ind} onClick={ () => addSub(subLayer, ind, `button`)}
									visibility={ subs[subLayer][`content`][ind + 1].start - subs[subLayer][`content`][ind].end !== 0 && disableSave === false ?
										`visible`
										:
										`hidden`
									}
									active={ind === index ? `subActive` : `nonActive`}
								/>
						}
					</div>
				))}
			</div>
		</Style>
	)
}

export default SubtitleEditorSideMenu
