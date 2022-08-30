import React from 'react'
import { mount } from 'enzyme'
import Player from '../../../../components/c/Player/index'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const viewstate = {
	ref: `ref`,
	url: `url`,
	playing: true,
	playbackRate: 10,
	progress: {
		playedSeconds: 10.12,
	},
	volume: 1,
	muted: true,
	blank: true,
	videoComment: `videoComment`,
	commentPosition: {
		x: 10,
		y: 10,
	},
	duration: 10,
	showTranscript: true,
	subtitleText: `subtitle text`,
	indexToDisplay: 1,
	censorPosition: 10,
	censorActive: true,
	displaySubtitles: {
		language: `english`,
		words: ``,
		content: [
			{
				end: 20.227533345404066,
				start: 0,
				text: `First Line`,
			},
		],
	},
	clipTime: [`1: 20`, `2:29`],
}

const handlers = {
	handleDuration: jest.fn(),
	handleMouseOut: jest.fn(),
	handleMouseOver: jest.fn(),
	handlePause: jest.fn(),
	handlePlay: jest.fn(),
	handleProgress: jest.fn(),
	handleSeekChange: jest.fn(),
	handlePlaybackRateChange: jest.fn(),
	handleBlank: jest.fn(),
	handleMuted: jest.fn(),
	handleUnmuted: jest.fn(),
	handleShowComment: jest.fn(),
	handleToggleTranscript: jest.fn(),
	handleShowSubtitle: jest.fn(),
	handleShowHelp: jest.fn(),
	handleShowTip: jest.fn(),
	toggleTip: jest.fn(),
	setCensorActive: jest.fn(),
	setCensorPosition: jest.fn(),
}

const props = {
	viewstate,
	handlers,
}

describe(`Overlay test`, () => {
	it(`wrapper simulate click`, () => {
		mount(
			<Provider store={testutil.store}>
				<BrowserRouter>
					<Player {...props} />
				</BrowserRouter>
			</Provider>,
		)
		// wrapper.find(Blank).simulate(`contextMenu`, {
		// 	preventDefault: () => {
		// 	},
		// })
		// wrapper.find(`ReactPlayer`).prop(`onProgress`)(true, 1)
		// wrapper.find(`ReactPlayer`).prop(`onSeek`)()
	})
})