import React from 'react'
import { Rnd } from 'react-rnd'
import { CloseBox, BeforeButton, AfterButton} from './styles'
const CensorDnD = props => {
	const {censorValues, censorEdit, handleUpdateCensorPosition, handleUpdateCensorResize,setCensorEdit,screenWidth,screenHeight,seekTo} = props
	const Enable = {top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true}
	const handleChange = (time) => {
		setCensorEdit(time.toString())
		seekTo(null,parseFloat(censorValues[time][0]))
	}
	if(censorEdit === -1 || censorValues.length===0)
		return (<></>)

	const checkExisting = () =>{
		// const keys = censorValues.map(val => val[0])
		// const next = keys.filter(value => parseFloat(value) > parseFloat(censorValues[censorEdit][0])).sort((a,b) => parseFloat(a)-parseFloat(b))[0]
		const next = censorValues.findIndex(censorValues.filter(val => parseFloat(val) > censorValues[censorEdit][0]).sort((a,b)=>parseFloat(a[0])-parseFloat(b[0]))[0])
		const previous = censorValues.findIndex(censorValues.filter(val => parseFloat(val) < censorValues[censorEdit][0]).sort((a,b)=>parseFloat(b[0])-parseFloat(a[0]))[0])
		// const previous = keys.filter(value => parseFloat(value) < parseFloat(censorValues[censorEdit][0])).sort((a,b) => parseFloat(b)-parseFloat(a))[0]
		// const prevKey = censorValues.find(val => val[0] === previous)
		// const nextKey = censorValues.find(val => val[0] === next)

		return(<div style={{width:`100%`,height:`100%`,position:`absolute`}}>
			{previous !== `-Infinity`&& previous !== undefined ? (
				<BeforeButton onClick={()=>handleChange(previous)}>
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

			{next !== undefined && next !== `Infinity`? (
				<AfterButton onClick={()=>handleChange(parseInt(next))}>
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