import { getInitials, objectIsEmpty, componentDidChange, logger } from '../../lib/util'

test(`should return initials`, () => {
	const initials = getInitials(`Test Name`)
	expect(initials).toBe(`TN`)
})

test(`should return true when object is empty`, () => {
	const test = {}
	const result = objectIsEmpty(test)
	expect(result).toBe(true)
})

test(`should return true when object is not empty`, () => {
	const test = {
		user: `test`,
	}
	const result = objectIsEmpty(test)
	expect(result).toBe(false)
})

let toConsole = false // eslint-disable-line no-unused-vars
let component = `` // eslint-disable-line no-unused-vars
let method = `` // eslint-disable-line no-unused-vars
let prevProps = {} // eslint-disable-line no-unused-vars
let nextProps = {} // eslint-disable-line no-unused-vars
let propsProperties = [] // eslint-disable-line no-unused-vars
let prevState = {} // eslint-disable-line no-unused-vars
let nextState = {} // eslint-disable-line no-unused-vars
let stateProperties = [] // eslint-disable-line no-unused-vars

test(`componentDidChange`, () => {
	// eslint-disable-next-line no-unused-vars
	const change = componentDidChange(
		toConsole = true,
		component = ``,
		method = ``,
		prevProps = {},
		nextProps = {},
		propsProperties = [{a:1}, {b:2}],
		prevState = {},
		nextState = {},
		stateProperties = [{a:1}, {b:2}],
	)
})

test(`logger: log`, async () => {
	console.log = jest.fn()
	logger.log(`log`, `vLog`)
	expect(console.log).toHaveBeenCalledWith(`%clog`, `background: transparent; color: white; font-weight: bold; padding: 2px 4px; border-radius: 2px;`, `vLog`)
	const result = logger.log(null, ``)
	expect(result).toBe(null)
})
test(`logger: log, no val`, async () => {
	console.log = jest.fn()
	logger.log(`log`, null)
	expect(console.log).toHaveBeenCalledWith(`%clog`, `background: transparent; color: white; font-weight: bold; padding: 2px 4px; border-radius: 2px;`, ``)
})
test(`logger: info`, async () => {
	console.log = jest.fn()
	logger.info(`info`, `vInfo`)
	expect(console.log).toHaveBeenCalledWith(`%cinfo`, `background: #61dafb; color: #282c34; font-weight: bold; padding: 2px 4px; border-radius: 2px;`, `vInfo`)
	const result = logger.info(null, ``)
	expect(result).toBe(null)
})
test(`logger: info, no val`, async () => {
	console.log = jest.fn()
	logger.info(`info`, null)
	expect(console.log).toHaveBeenCalledWith(`%cinfo`, `background: #61dafb; color: #282c34; font-weight: bold; padding: 2px 4px; border-radius: 2px;`, ``)
})
test(`logger: warn`, async () => {
	console.log = jest.fn()
	logger.warn(`warn`, `vWarn`)
	expect(console.log).toHaveBeenCalledWith(`%cwarn`, `background: #ffbb17; color: #332b00; font-weight: bold; padding: 2px 4px; border-radius: 2px;`, `vWarn`)
	const result = logger.warn(null, ``)
	expect(result).toBe(null)
})
test(`logger: warn, no val`, async () => {
	console.log = jest.fn()
	logger.warn(`warn`, null)
	expect(console.log).toHaveBeenCalledWith(`%cwarn`, `background: #ffbb17; color: #332b00; font-weight: bold; padding: 2px 4px; border-radius: 2px;`, ``)
})
test(`logger: error`, async () => {
	console.log = jest.fn()
	logger.error(`error`, `vError`)
	expect(console.log).toHaveBeenCalledWith(`%cerror`, `background: #dc2727; color: #290000; font-weight: bold; padding: 2px 4px; border-radius: 2px;`, `vError`)
	const result = logger.error(null, ``)
	expect(result).toBe(null)
})
test(`logger: error, no val`, async () => {
	console.log = jest.fn()
	logger.error(`error`, null)
	expect(console.log).toHaveBeenCalledWith(`%cerror`, `background: #dc2727; color: #290000; font-weight: bold; padding: 2px 4px; border-radius: 2px;`, ``)
})
test(`logger: logc`, async () => {
	console.log = jest.fn()
	logger.logc(`logc`, `css`, `vLogc`)
	expect(console.log).toHaveBeenCalledWith(`%clogc`, `background: transparent; color: white; font-weight: bold; padding: 2px 4px; border-radius: 2px; css`, `vLogc`)
	const result = logger.logc(null, ``)
	expect(result).toBe(null)
})
test(`logger: logc, no val`, async () => {
	console.log = jest.fn()
	logger.logc(`logc`, `css`, null)
	expect(console.log).toHaveBeenCalledWith(`%clogc`, `background: transparent; color: white; font-weight: bold; padding: 2px 4px; border-radius: 2px; css`, ``)
})
test(`logger: group`, async () => {
	console.groupCollapsed = jest.fn()
	logger.group(`group`)
	expect(console.groupCollapsed).toHaveBeenCalledWith(`%cgroup`, `background: #61dafb; color: #282c34; font-weight: bold; padding: 2px 4px; border-radius: 2px;`)
	const result = logger.group(null, ``)
	expect(result).toBe(null)
})
test(`logger: groupEnd`, async () => {
	console.groupEnd = jest.fn()
	logger.groupEnd(`groupEnd`)
	expect(console.groupEnd).toHaveBeenCalledWith(`%cgroupEnd`, `background: #61dafb; color: #282c34; font-weight: bold; padding: 2px 4px; border-radius: 2px;`)
	const result = logger.groupEnd(null, ``)
	expect(result).toBe(null)
})

