function Values(top1,top2,left1,left2, width1, width2,height1,height2, next, previous){
	this.top1 = top1
	this.top2 = top2
	this.left1 = left1
	this.left2 = left2
	this.width1 = width1
	this.width2 = width2
	this.height1 = height1
	this.height2 = height2
	this.next = next
	this.previous = previous
}
const getPos = (events, t) => {
	const time = t !== undefined ? t : 0.0

	if(Object.keys(events).length < 1 || events === {}){
		const values = new Values(0,0,0,0,0,0,0,0,0,0)
		return values
	}else{
		const keys = Object.keys(events).map(val => events[val][0])
		// const next = Math.min(...keys.filter(value => parseFloat(value) > time)).toFixed(1).toString()
		const next = keys.filter(value => parseFloat(value) > time).sort((a,b) => parseFloat(a)-parseFloat(b))[0]
		const previous = keys.filter(value => parseFloat(value) < time).sort((a,b) => parseFloat(b)-parseFloat(a))[0]
		// const filterKeys = keys.map(num => parseFloat(num)).filter(value => value < parseFloat(next))
		// const previous = next !== undefined ? Math.max(...filterKeys).toFixed(1).toString() : Math.max(...keys).toFixed(1).toString()
		const prevKey = Object.keys(events).find(val => events[val][0] === previous)
		const nextKey = Object.keys(events).find(val => events[val][0] === next)
		if (next === undefined || next === `Infinity`){
			const values = new Values(events[prevKey][2],events[prevKey][2],events[prevKey][1],events[prevKey][1],events[prevKey][3],events[prevKey][3],events[prevKey][4],events[prevKey][4],next,previous)
			return values
		}
		if (previous === `NaN` || previous === `-Infinity`|| previous === undefined){
			// console.log(`Previous doesn't exist`)
			const values = new Values(events[nextKey][2],events[nextKey][2],events[nextKey][1],events[nextKey][1],events[nextKey][3],events[nextKey][3],events[nextKey][4],events[nextKey][4],next,previous)
			return values
		}
		const values = new Values(events[prevKey][2],events[nextKey][2],events[prevKey][1],events[nextKey][1],events[prevKey][3],events[nextKey][3],events[prevKey][4],events[nextKey][4],next,previous)
		return values
	}
}
const Position = (censors, time,duration) => {
	return getPos(censors, time)
}
export default Position