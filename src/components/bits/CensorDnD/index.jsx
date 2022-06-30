import React from 'react'
import { Rnd } from 'react-rnd'
import { CloseBox, BeforeButton, AfterButton } from './styles'
import closeIcon from 'assets/close_icon.svg'
import arrowRight from 'assets/arrow-right.svg'
import arrowLeft from 'assets/arrow-left.svg'
const CensorDnD = props => {

	const {
		censorValues,
		censorEdit,
		handleUpdateCensorPosition,
		handleUpdateCensorResize,
		setCensorEdit,
		screenWidth,
		screenHeight,
		seekTo,
	} = props

	const Enable = {
		top: true,
		right: true,
		bottom: true,
		left: true,
		topRight: true,
		bottomRight: true,
		bottomLeft: true,
		topLeft: true,
	}

	const handleChange = (time) => {
		setCensorEdit(time.toString())
		seekTo(null, parseFloat(censorValues[time][0]))
	}

	if (censorEdit === -1 || censorEdit === `-1` || censorValues.length === 0)
		return (<></>)

	const checkExisting = () => {
		const vals = Object.values(censorValues)
		const next = Object.keys(censorValues).find(val => censorValues[val] === vals.filter(value => parseFloat(value) > parseFloat(censorValues[censorEdit][0])).sort((a, b) => parseFloat(a)-parseFloat(b))[0])
		const previous = Object.keys(censorValues).find(val=> censorValues[val] === vals.filter(value => parseFloat(value) < parseFloat(censorValues[censorEdit][0])).sort((a, b) => parseFloat(b)-parseFloat(a))[0])
		// const prevKey = censorValues.find(val => val[0] === previous)
		// const nextKey = censorValues.find(val => val[0] === next)

		return(<div style={{width: `100%`, height: `100%`, position: `absolute`}}>
			{ previous !== `-Infinity`&& previous !== undefined &&
				<BeforeButton onClick={() => handleChange(previous)}>
					<img src={arrowLeft} alt='previous' />
				</BeforeButton>
			}
			<Rnd
				size={
					{
						width: `${censorValues[censorEdit][3]}%`,
						height: `${censorValues[censorEdit][4]}%`,
					}}
				position={
					{
						x: censorValues[censorEdit][1] / 100 * screenWidth - censorValues[censorEdit][3] / 100 * screenWidth / 2,
						y: censorValues[censorEdit][2] / 100 * screenHeight - censorValues[censorEdit][4] / 100 * screenHeight / 2,
					}}
				enableResizing={Enable}
				dragAxis='both'
				bounds={`parent`}
				onDragStop={(e, d) => handleUpdateCensorPosition(d)}
				onResizeStop={(e, d, ref, delta, position) => handleUpdateCensorResize(delta, position)}
				style={
					{
						border: `3px solid rgba(5, 130, 202, 0.7)`,
						backgroundColor: `rgba(5, 130, 202, 0.4)`,
					}}
			>
			</Rnd>
			<CloseBox onClick={() => setCensorEdit(-1)}>
				<img src={closeIcon} alt='close' />
			</CloseBox>

			{ next !== undefined && next !== `Infinity` &&
				<AfterButton onClick={() => handleChange(parseInt(next))}>
					<img src={arrowRight} alt='next' />
				</AfterButton>
			}
		</div>)
	}
	return (
		checkExisting()
	)

}
export default CensorDnD