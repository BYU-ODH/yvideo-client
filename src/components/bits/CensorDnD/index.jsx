import React from 'react'
import { Rnd } from 'react-rnd'
import {ActiveBox, BeforeBox, AfterBox, CloseBox, BeforeButton, AfterButton} from './styles'
const CensorDnD = props => {
	const {censorValues, censorEdit, handleUpdateCensorPosition, handleUpdateCensorResize,setCensorEdit,screenWidth,screenHeight,seekTo} = props
	const Enable = {top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true}
	const handleChange = (time) => {
		setCensorEdit(time.toString())
		seekTo(null,parseFloat(censorValues[time][0]))
	}
	if(censorEdit === -1 || Object.keys(censorValues).length===0)
		return (<></>)

	const checkExisting = () =>{
		const keys = Object.keys(censorValues).map(val => censorValues[val][0])
		const next = keys.filter(value => parseFloat(value) > parseFloat(censorValues[censorEdit][0])).sort((a,b) => parseFloat(a)-parseFloat(b))[0]
		const previous = keys.filter(value => parseFloat(value) < parseFloat(censorValues[censorEdit][0])).sort((a,b) => parseFloat(b)-parseFloat(a))[0]
		const prevKey = Object.keys(censorValues).find(val => censorValues[val][0] === previous)
		const nextKey = Object.keys(censorValues).find(val => censorValues[val][0] === next)
		return(<div style={{width:`100%`,height:`100%`,position:`absolute`}}>
			{prevKey !== `-Infinity`&& prevKey !== undefined ? (
				<BeforeButton onClick={()=>handleChange(prevKey)}>
					<h1 style={{fontWeight:700,color:`black`}}>Previous</h1>
				</BeforeButton>
			):null}
			<Rnd
				size={{width: `${censorValues[censorEdit][3]}%`, height: `${censorValues[censorEdit][4]}%`}}
				position={{ x: censorValues[censorEdit][1]/100*screenWidth - censorValues[censorEdit][3]/100*screenWidth/2 , y: censorValues[censorEdit][2]/100*screenHeight - censorValues[censorEdit][4]/100*screenHeight/2}}
				enableResizing={Enable}
				dragAxis='both'
				bounds={`parent`}
				onDragStop={(e, d) => handleUpdateCensorPosition(d)}
				onResizeStop={(e, direction, ref, delta, position) => handleUpdateCensorResize(delta, position)}
				style={{border:`3px solid rgba(5, 130, 202,0.7)`,backgroundColor:`rgba(5, 130, 202,0.4)`}}
			>
			</Rnd>
			<CloseBox onClick={()=>setCensorEdit(-1)}>
				<h1 style={{textAlign:`center`,fontWeight:900}}>X</h1>
			</CloseBox>

			{nextKey !== undefined && nextKey !== `Infinity`? (
				<AfterButton onClick={()=>handleChange(parseInt(nextKey))}>
					<h1 style={{fontWeight:700,color:`black`}}>Next</h1>
				</AfterButton>
			):null}
		</div>)
	}
	return (
		checkExisting()
	)

}
export default CensorDnD