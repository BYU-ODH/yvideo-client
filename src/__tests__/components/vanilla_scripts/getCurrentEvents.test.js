import { HandleSubtitle, CurrentEvents, CensorChange, CommentChange } from '../../../components/vanilla_scripts/getCurrentEvents'

const IdMock = {
	style: {
		width: 1,
		height: 0,
		top: 0,
		left: 0,
	},
	remove: jest.fn(() => {
		return null
	}),
	children: [{ className: `className1` }, { className: `className2` }],
	removeChild: jest.fn(() => {
		return null
	}),
	appendChild: jest.fn(() => {
		return null
	}),
}

document.getElementById = jest.fn((tag) => {
	return IdMock
})

test(`should call HandleSubtitle`, () => {
	const subtitle = [
		[
			{	end: 10,
				start: 0,
				text: `test subtitle`,
			},
		],
	]
	HandleSubtitle(5, subtitle, 0)
})

test(`should call CurrentEvents`, () => {
	const result = CurrentEvents(5, [
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Skip`,
			position: { x: 10, y: 50},
		},
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Comment`,
			position: { x: 10, y: 50},
		},
	], 0)
	expect(result).toBeDefined()
})

test(`should call CurrentEvents, without comment`, () => {
	const result = CurrentEvents(5, [
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Skip`,
			position: { x: 10, y: 50},
		},
	], 0)
	expect(result).toBeDefined()
})

test(`should call CurrentEvents, without commentChildren`, () => {
	const IdMock = {
		innerHTML: `text`,
		style: {
			width: 1,
			height: 0,
			top: 0,
			left: 0,
		},
		remove: jest.fn(() => {
			return null
		}),
		children: [],
		removeChild: jest.fn(() => {
			return null
		}),
		appendChild: jest.fn(() => {
			return null
		}),
	}

	document.getElementById = jest.fn((tag) => {
		return IdMock
	})

	const result = CurrentEvents(5, [
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Skip`,
			position: { x: 10, y: 50},
		},
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Comment`,
			position: { x: 10, y: 50},
		},
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Censor`,
			position: { x: 10, y: 50},
		},
		{
			end: 10,
			icon: `/static/media/event_skip.cbe8f9bf.svg`,
			layer: 0,
			start: 0,
			type: `Blank`,
			position: { x: 10, y: 50},
		},
	], 0)
	expect(result).toBeDefined()
})

test(`should call CensorChange`, () => {
	CensorChange(0, {top1: 1, top2: 2, left1: 1, left2: 2, previous: 3, width2: 2, width1: 1}, 10)
})

test(`should call CommentChange`, () => {
	CommentChange(0, { x: 10, y: 10})
})