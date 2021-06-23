import Position from '../../../../components/c/Player/censorPosition'

const time = 0
const events = { '0': [ 0, 0, 800, 600 ], '1': [ 0, 0, 800, 600 ] }
describe(`Censor Position test`, () => {
	it(`call function`, ()=> {
		const events = { '1.0': [ 0, 0, 800, 600 ] }
		const time = '1'
		Position(events, time)
	})
	it(`call function: event === {}`, ()=> {
		const events = { }
		const time = '-1'
		Position(events, time)
	})
	it(`call function: previous === -Infinity`, ()=> {
		const events = { '1.0': [ 0, 0, 800, 600 ] }
		const time = '-1'
		Position(events, time)
	})
})