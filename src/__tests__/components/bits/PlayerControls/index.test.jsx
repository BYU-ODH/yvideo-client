import React from 'react'
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlayerControls from '../../../../components/bits/PlayerControls'
import { BrowserRouter } from 'react-router-dom'

const props = {
	handlers : {
		handlePause: jest.fn(),
		handlePlay: jest.fn(),
		handlePlaybackRateChange: jest.fn(),
		handleSeekChange: jest.fn(),
		handleToggleFullscreen: jest.fn(),
		handleChangeSubtitle: jest.fn(),
		handleShowTip: jest.fn(),
		handleShowHelp: jest.fn(),
		toggleTip: jest.fn(),
		handleSeekToSubtitle: jest.fn(),
		handleChangeSpeed: jest.fn(),
		handleChangeCaption: jest.fn(),
		handleToggleSubtitles: jest.fn(),
		handleOffSubtitles:	jest.fn(),
		handleToggleTranscript: jest.fn(),

		setShowSpeed: jest.fn(),
		setIsCaption: jest.fn(),
	},
	viewstate : {
		fullscreen: true,
		displaySubtitles: {

		},
		progress: {
			played: `played`,
		},
		playing: false,
		isCaption: true,
		isAdmin: true,
		isProf: false,
		isMobile: false,
		indexToDisplay: 0,
		showTranscript: true,
		showSpeed: true,
		playbackOptions: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.25, 1.5, 1.75, 2].sort(),
		playbackRate: 1.0,
		playTime: `00:00.00`,
		clipTime: [1, 2, 3],
		duration: 120,
		subtitles: [
			{
				content: [
					{
						end: 24.201520912547526,
						start: 3.2319391634980987,
						text: `First Line`,
					},
				],
				id: 1,
				language: `English`,
				title: `English`,
			},
			{
				content: [
					{
						end: 40,
						start: 30,
						text: `Second Line`,
					},
				],
				id: 2,
				language: `Spanish`,
				title: `Spanish`,
			},
		],
	},

	skipArray: [],
}

const wrapper =
	<BrowserRouter>
		<PlayerControls {...props} />
	</BrowserRouter>

describe(`PlayerControls test`, () => {
	describe(`Clean events tests`, () => {
		beforeEach(() => {
			render(wrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`playTime render` , () => {
			expect(screen.queryByText(/00:00.00/)).not.toBeNull()
			expect(screen.queryByText(/[1-9][1-9]:[1-9][1-9]\.[1-9][1-9]/)).toBeNull()
		})

		it(`startOver onClick`, async () => {
			const user = userEvent.setup()
			const startOver = screen.getByAltText(`start-over`)

			await user.click(startOver)
			expect(props.handlers.handleSeekChange).toHaveBeenCalled()
			expect(props.handlers.handleShowTip).toHaveBeenCalled()

			fireEvent.mouseLeave(startOver)
			expect(props.handlers.toggleTip).toHaveBeenCalled()
		})

		it(`prev-sub & next-sub onClick`, async () => {
			const user = userEvent.setup()
			const prevSub = screen.getByAltText(`Previous Subtitle`)
			const nextSub = screen.getByAltText(`Next Subtitle`)

			await user.click(prevSub)
			await user.click(nextSub)
			expect(props.handlers.handleSeekToSubtitle).toHaveBeenCalledTimes(2)
			expect(props.handlers.handleShowTip).toHaveBeenCalledTimes(2)

			fireEvent.mouseLeave(prevSub)
			fireEvent.mouseLeave(nextSub)
			expect(props.handlers.toggleTip).toHaveBeenCalledTimes(3)
		})

		it(`speed onClick`, async () => {
			const user = userEvent.setup()
			const Speed = screen.getByTestId(`speed`)

			await user.click(Speed)
			expect(props.handlers.handleChangeSpeed).toHaveBeenCalled()
			expect(props.handlers.handleShowTip).toHaveBeenCalled()

			fireEvent.mouseLeave(Speed)
			expect(props.handlers.toggleTip).toHaveBeenCalled()
		})
		it(`change speed`, async () => {
			const user = userEvent.setup()
			const Speed = screen.getByTestId(`speed`)

			await user.click(Speed)
			expect(props.handlers.handleChangeSpeed).toHaveBeenCalled()

			const option1 = screen.getByText(/Normal/i)

			props.viewstate.playbackOptions.forEach(option => {
				if (option === 1)
					expect(option1).toBeInTheDocument()
				else
					expect(screen.getByText(`${option}`)).toBeInTheDocument()
			})
			expect(screen.getByText(/Normal/i).className).toBe(`active-value`)
			expect(screen.getByText(/1.25/i).className).toBe(``)

			await user.click(option1)
			expect(props.handlers.handlePlaybackRateChange).toHaveBeenCalled()
			await user.click(screen.getByText(/1.25/i))
			expect(screen.getByText(/1.25/i).className).toBe(``)
		})
		it(`should not render book and Help`, () => {
			expect(screen.queryByTestId(`transcript-toggle`)).toBeNull()
			expect(screen.queryByTestId(`help`)).toBeNull()
		})
	})

	describe(`miscellaneous`, () => {
		it(`pauseButton`, async () => {
			props.viewstate.playing = false
			render(wrapper)
			const user = userEvent.setup()
			const PlayPause = screen.getByTestId(`playPause`)

			await user.click(PlayPause)
			await user.click(PlayPause) // user.click is a combo of mouseEnter, mouseDown, mouseUp, and others
			expect(props.handlers.handlePlay).toHaveBeenCalledTimes(2)
			expect(props.handlers.handleShowTip).toHaveBeenCalled()
			fireEvent.mouseLeave(PlayPause)
			expect(props.handlers.toggleTip).toHaveBeenCalled()

			expect(PlayPause).toHaveStyle(`background: url(controls_play.svg) no-repeat center`)
		})

		it(`playButton`, async () => {
			props.viewstate.playing = true
			render(wrapper)
			const user = userEvent.setup()
			const PlayPause = screen.getByTestId(`playPause`)

			await user.click(PlayPause)
			expect(props.handlers.handlePause).toHaveBeenCalled()

			expect(PlayPause).toHaveStyle(`background: url(controls_pause.svg) no-repeat center`)
		})

		it(`captions onClick (as admin or professor)`, async () => {
			props.viewstate.isAdmin = true
			render(wrapper)
			const user = userEvent.setup()
			const ClosedCaptions = screen.getByTestId(`closed-captions`)
			const language1 = screen.getByText(`${props.viewstate.subtitles[0].title}`)
			const language2 = screen.getByText(`${props.viewstate.subtitles[1].title}`)
			const offButton = screen.getByTestId(`off-button`)

			await user.click(ClosedCaptions)
			expect(props.handlers.handleChangeCaption).toHaveBeenCalled()

			fireEvent.mouseLeave(ClosedCaptions)
			expect(props.handlers.toggleTip).toHaveBeenCalled()

			expect(screen.getByText(/Select Caption/i)).toBeInTheDocument()

			expect(language1).toBeInTheDocument()
			expect(language1.value).toBe(`English`)

			await user.click(language1)
			expect(language1.className).toBe(`active-value`)
			expect(language2.className).toBe(``)
			props.viewstate.displaySubtitles = props.viewstate.subtitles[0]

			expect(offButton).toBeInTheDocument()
			await user.click(offButton)
			expect(props.handlers.handleOffSubtitles).toHaveBeenCalled()

			fireEvent.mouseLeave(ClosedCaptions)
			expect(props.handlers.toggleTip).toHaveBeenCalled()
		})

		it(`captions onClick (as lab-assistant or student)`, async () => {
			props.viewstate.isAdmin = false
			render(wrapper)

			const user = userEvent.setup()
			const ClosedCaptions = screen.getByTestId(`closed-captions`)

			await user.click(ClosedCaptions)
			expect(props.handlers.handleToggleSubtitles).toHaveBeenCalled()
		})

		it(`fullscreen onClick`, async () => {
			props.viewstate.fullscreen = false
			render(wrapper)
			const user = userEvent.setup()
			const Fullscreen = screen.getByTestId(`fullscreen`)

			await user.click(Fullscreen) // user.click is a combo of mouseEnter, mouseDown, mouseUp, and others
			expect(props.handlers.handleToggleFullscreen).toHaveBeenCalled()
			expect(props.handlers.handleShowTip).toHaveBeenCalled()

			fireEvent.mouseLeave(Fullscreen)
			expect(props.handlers.toggleTip).toHaveBeenCalled()
			expect(Fullscreen).toHaveStyle(`background: url(controls_enter_fullscreen.svg) no-repeat center;`)
		})

		it(`exit fullscreen`, async () => {
			props.viewstate.fullscreen = true
			render(wrapper)

			const Fullscreen = screen.getByTestId(`fullscreen`)
			expect(Fullscreen).toHaveStyle(`background: url(controls_exit_fullscreen.svg) no-repeat center;`)
		})
	})

	describe(`isMobile`, () => {
		beforeEach(() => {
			props.viewstate.isMobile = true
			render(wrapper)
		})
		afterEach(() => {
			jest.resetAllMocks()
			cleanup()
		})
		it(`should render functional Help button`, async () => {
			const user = userEvent.setup()
			const Help = screen.getByTestId(`help`)

			expect(Help).toBeInTheDocument()
			await user.click(Help)
			expect(props.handlers.handleShowHelp).toHaveBeenCalled()
			expect(props.handlers.handleShowTip).toHaveBeenCalled()

			fireEvent.mouseLeave(Help)
			expect(props.handlers.toggleTip).toHaveBeenCalled()
		})
		it(`should render functional book icon`, async () => {
			const user = userEvent.setup()
			const Book = screen.getByTestId(`transcript-toggle`)

			expect(Book).toBeInTheDocument()
			await user.click(Book)
			expect(props.handlers.handleToggleTranscript).toHaveBeenCalled()
		})
	})
})
