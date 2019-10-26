import { diff } from 'deep-object-diff'

export const getInitials = fullName => {
	let initials = fullName.match(/\b\w/g) || []
	initials = ((initials.shift() || ``) + (initials.pop() || ``)).toUpperCase()
	return initials
}

export const objectIsEmpty = o => {
	return Object.entries(o).length === 0 && o.constructor === Object
}

export const didChange = (
	toConsole = false,
	label = `[INFO: COMPONENT] FUNCTION`,
	prevProps = {},
	nextProps = {},
	propsProperties = [],
	prevState = {},
	nextState = {},
	stateProperties = []
) => {

	if (toConsole) console.groupCollapsed(label)

	const propsDiff = diff(prevProps, nextProps)
	const stateDiff = diff(prevState, nextState)

	if (toConsole) console.log(`props changes:`, propsDiff)
	if (toConsole) console.log(`state changes:`, stateDiff)

	const propsChanged = propsProperties.reduce((acc, property) => {
		const key = `${property}Changed`
		return {
			...acc,
			[key]: {
				value: propsDiff.hasOwnProperty(property),
			},
		}
	}, {})

	const stateChanged = stateProperties.reduce((acc, property) => {
		const key = `${property}Changed`
		return {
			...acc,
			[key]: {
				value: stateDiff.hasOwnProperty(property),
			},
		}
	}, {})

	const propsKeys = Object.keys(propsChanged)
	const stateKeys = Object.keys(stateChanged)

	if (toConsole && propsKeys.length > 0) console.table(propsChanged)
	if (toConsole && stateKeys.length > 0) console.table(stateChanged)

	const changed = propsKeys.length > 0 ? propsKeys.every(item => item.value) : false || stateKeys.length > 0 ? stateKeys.every(item => item.value) : false

	if (toConsole) console.log(`%c ${changed ? `RENDER` : `NO RENDER`} `, `background: ${changed ? `Maroon` : `Teal`}`)

	if (toConsole) console.groupEnd(label)

	return changed
}
