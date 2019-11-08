import { diff } from 'deep-object-diff'

export const getInitials = fullName => {
	let initials = fullName.match(/\b\w/g) || []
	initials = ((initials.shift() || ``) + (initials.pop() || ``)).toUpperCase()
	return initials
}

export const objectIsEmpty = o => {
	return Object.entries(o).length === 0 && o.constructor === Object
}

export const componentDidChange = async (
	toConsole = false,
	component = ``,
	method = ``,
	prevProps = {},
	nextProps = {},
	propsProperties = [],
	prevState = {},
	nextState = {},
	stateProperties = []
) => {

	const label = `[DEBUG] ${component}.${method}()`

	if (toConsole) logger.group(label)

	const propsDiff = diff(prevProps, nextProps)
	const stateDiff = diff(prevState, nextState)

	if (toConsole) logger.log(`props changes:`, propsDiff)
	if (toConsole) logger.log(`state changes:`, stateDiff)

	const propsChanged = propsProperties.reduce((acc, property) => ({
		...acc,
		[`props.${property} Changed`]: {
			value: propsDiff.hasOwnProperty(property),
		},
	}), {})

	const stateChanged = stateProperties.reduce((acc, property) => ({
		...acc,
		[`state.${property} Changed`]: {
			value: stateDiff.hasOwnProperty(property),
		},
	}), {})

	const propsKeys = Object.keys(propsChanged)
	const stateKeys = Object.keys(stateChanged)

	if (toConsole && propsKeys.length > 0) console.table(propsChanged)
	if (toConsole && stateKeys.length > 0) console.table(stateChanged)

	const changed =
		(
			propsKeys.length > 0 ?
				propsKeys.some(key => propsChanged[key].value)
				:
				false
		) || (
			stateKeys.length > 0 ?
				stateKeys.some(key => stateChanged[key].value)
				:
				false
		)

	if (toConsole) logger.logc(`${changed ? `RENDER` : `NO RENDER`}`, `background: ${changed ? `Maroon` : `Teal`}`)

	if (toConsole) logger.groupEnd(label)

	return changed
}

const logStyle = `background: transparent; color: white; font-weight: bold; padding: 2px 4px; border-radius: 2px;`
const infoStyle = `background: #61dafb; color: #282c34; font-weight: bold; padding: 2px 4px; border-radius: 2px;`
const warnStyle = `background: #ffbb17; color: #332b00; font-weight: bold; padding: 2px 4px; border-radius: 2px;`
const errorStyle = `background: #dc2727; color: #290000; font-weight: bold; padding: 2px 4px; border-radius: 2px;`

export const logger = {
	log: (message, variable) => message ? console.log(`%c${message}`, logStyle, variable ? variable : ``) : null,
	info: (message, variable) => message ? console.log(`%c${message}`, infoStyle, variable ? variable : ``) : null,
	warn: (message, variable) => message ? console.log(`%c${message}`, warnStyle, variable ? variable : ``) : null,
	error: (message, variable) => message ? console.log(`%c${message}`, errorStyle, variable ? variable : ``) : null,
	logc: (message, css, variable) => message ? console.log(`%c${message}`, `${logStyle} ${css}`, variable ? variable : ``) : null,
	group: (message) => message ? console.groupCollapsed(`%c${message}`, infoStyle) : null,
	groupEnd: (message) => message ? console.groupEnd(`%c${message}`, infoStyle) : null,
}
