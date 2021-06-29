const Position = (events, time,duration) => {
	if(Object.keys(events).length < 1 || events === {}){
		const values={
			top1 : 0,
			top2 : 0,
			left1 : 0,
			left2 : 0,
			width1 : 0,
			width2 : 0,
			height1 : 0,
			height2 : 0,
			next : 0,
			previous : 0,
		}
		return values
	}else{
		const keys = Object.keys(events)
		// console.log(keys.filter(value => parseFloat(value) > time))
		const next = Math.min(...keys.filter(value => parseFloat(value) > time)).toFixed(1).toString()
		const filterKeys = keys.map(num => parseFloat(num)).filter(value => value < parseFloat(next))
		const previous = next !== undefined ? Math.max(...filterKeys).toFixed(1).toString() : Math.max(...keys).toFixed(1).toString()
		// console.log(`!!`,time,previous,next,filterKeys,keys,Math.max(...filterKeys),keys.map(num=>parseFloat(num)).filter(value=>value<parseFloat(next)))
		if (next === undefined || next === `Infinity`){
			const values={
				top1 : events[previous][1],
				top2 : events[previous][1],
				left1 : events[previous][0],
				left2 : events[previous][0],
				width1 : events[previous][2],
				width2 : events[previous][2],
				height1 : events[previous][3],
				height2 : events[previous][3],
				next : 0,
				previous,
			}
			return values
		}
		if (previous === `NaN` || previous === `-Infinity`){
			const values={
				top1 : events[next][1],
				top2 : events[next][1],
				left1 : events[next][0],
				left2 : events[next][0],
				width1 : events[next][2],
				width2 : events[next][2],
				height1 : events[next][3],
				height2 : events[next][3],
				next,
				previous,
			}
			return values
		}
		const values={
			top1 : events[previous][1],
			top2 : events[next][1],
			left1 : events[previous][0],
			left2 : events[next][0],
			width1 : events[previous][2],
			width2 : events[next][2],
			height1 : events[previous][3],
			height2 : events[next][3],
			next,
			previous,
		}
		return values
	}
}
export default Position