import React from 'react'
import { Rnd } from 'react-rnd'
import {ActiveBox, BeforeBox, AfterBox, CloseBox, BeforeButton, AfterButton} from './styles'
const CensorDnD = props => {
	const {censorValues, censorEdit, handleUpdateCensorPosition, handleUpdateCensorResize,setCensorEdit,screenWidth,screenHeight,seekTo} = props
	const Enable = {top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true}
	const handleChange = (time) => {
		setCensorEdit(time)
		seekTo(null,parseFloat(time))
	}
	if(censorEdit === -1 || Object.keys(censorValues).length===0) {
		return (<></>)
	}
	const checkExisting = () =>{
		const keys = Object.keys(censorValues)
		const next = Math.min(...keys.filter(value => parseFloat(value) > parseFloat(censorEdit))).toFixed(1).toString()
		const filterKeys = keys.map(num => parseFloat(num)).filter(value => value < parseFloat(censorEdit))
		const previous = next !== undefined ? Math.max(...filterKeys).toFixed(1).toString() : Math.max(...keys).toFixed(1).toString()
		// console.log(`!!`,censorValues,censorEdit,previous,next,filterKeys,keys,Math.max(...filterKeys),keys.map(num=>parseFloat(num)).filter(value=>value<parseFloat(next)))

		return(<div style={{width:`100%`,height:`100%`,position:`absolute`}}>
			{previous !== `-Infinity`? (
				<BeforeButton onClick={()=>handleChange(previous)}>
					<h1 style={{fontWeight:700,color:`black`}}>Previous</h1>
				</BeforeButton>
				// <Rnd
				// 	size={{width: `${censorValues[previous][2]}%`, height: `${censorValues[previous][3]}%`}}
				// 	position={{ x: censorValues[previous][0] , y: censorValues[previous][1]}}
				// 	enableResizing={Enable}
				// 	dragAxis='both'
				// 	bounds={`parent`}
				// 	onClick={()=>setCensorEdit(previous)}
				// 	// onDragStop={(e, d) => handleUpdateCensorPosition(d)}
				// 	// onResizeStop={(e, direction, ref, delta, position) => handleUpdateCensorResize(delta, position)}
				// 	style={{border:`5px solid rgba(202, 5, 5,0.7)`,backgroundColor:`rgba(202, 5, 5,0.4)`}}
				// >
				// </Rnd>
			):null}
			<Rnd
				size={{width: `${censorValues[censorEdit][2]}%`, height: `${censorValues[censorEdit][3]}%`}}
				position={{ x: censorValues[censorEdit][0]/100*screenWidth - censorValues[censorEdit][2]/100*screenWidth/2 , y: censorValues[censorEdit][1]/100*screenHeight - censorValues[censorEdit][3]/100*screenHeight/2}}
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

			{next !== undefined && next !== `Infinity`? (
				<AfterButton onClick={()=>handleChange(next)}>
					<h1 style={{fontWeight:700,color:`black`}}>Next</h1>
				</AfterButton>
				// <Rnd
				// 	size={{width: `${censorValues[next][2]}%`, height: `${censorValues[next][3]}%`}}
				// 	position={{ x: censorValues[next][0] , y: censorValues[next][1]}}
				// 	enableResizing={Enable}
				// 	dragAxis='both'
				// 	bounds={`parent`}
				// 	style={{border:`5px solidrgba(5, 202, 12,0.7)`,backgroundColor:`rgba(5, 202, 12,0.4)`}}
				// 	onClick={()=>setCensorEdit(previous)}

			// 	// onDragStop={(e, d) => handleUpdateCensorPosition(d)}
			// 	// onResizeStop={(e, direction, ref, delta, position) => handleUpdateCensorResize(delta, position)}
			// >
			// </Rnd>
			):null}
		</div>)
	}
	return (
		checkExisting()
	)

}
export default CensorDnD