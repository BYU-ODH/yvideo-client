import React, { Component, createRef } from 'react'
import ReactPlayer from 'react-player'

import { PlayerControls, Transcript } from 'components/bits'
import { PlayerSubtitlesContainer } from 'containers'
import { CurrentEvents, CensorChange, CommentChange, HandleSubtitle } from 'components/vanilla_scripts/getCurrentEvents'

import playButton from 'assets/hexborder.svg'
import Style, { Blank, Subtitles, PlayButton, PauseMessage, AlertMessage } from './styles'
export default class Player extends Component {
	constructor(props) {
		super(props)
		this.handleSeek = (e, time) => this.props.handlers.handleSeekChange(e, time)
		this.handlePlayPause = (bool) => this.props.handlers.handlePlayPause(bool)
		this.handlePlaybackRateChange = (change) => this.props.handlers.handlePlaybackRateChange(change)
		this.handleToggleFullscreen = (bool) => this.props.handlers.handleToggleFullscreen(bool)
		this.handleToggleSubtitles = (bool) => this.props.handlers.handleToggleSubtitles(bool)
		this.playbackOptions = this.props.viewstate.playbackOptions
		this.checkBrowser = () => this.props.handlers.checkBrowser
		this.state = {
			skipArray: [],
		}
	}
	componentDidMount(){
		if (this.props.clipTime) if(this.props.clipTime.length > 0) this.props.ref.seekto(this.props.clipTime[0])

		window.onkeyup = (e) => {
			this.handleHotKeys(e)
		}

		this.checkBrowser()
	}

	componentWillUnmount(){
		window.onkeyup = null
	}

	handleHotKeys = (e) => {
		const playedTime = parseFloat(document.getElementById(`seconds-time-holder`).innerHTML)
		switch (e.code) {
		case `ArrowRight`:
			this.handleSeek(null, playedTime + 10)
			break
		case `ArrowLeft`:
			this.handleSeek(null, playedTime - 10)
			break
		case `Period`:
			// If they press the periodKey and the shiftKey isn't pressed down, do the seeking, but if the shift key IS pressed down, do the else block
			if(!e.shiftKey) {
				this.handleSeek(null, playedTime + 1)
				break
			} else {
				// Checking to make sure that the value of the playback rate is within the possible options
				if (this.props.viewstate.playbackRate >= this.playbackOptions[0] && this.props.viewstate.playbackRate < this.playbackOptions[this.playbackOptions.length - 1])
					this.handlePlaybackRateChange(this.playbackOptions[this.playbackOptions.findIndex(element => element === this.props.viewstate.playbackRate) + 1])

				break
			}
		case `Comma`:
			// If they press the commaKey and the shiftKey isn't pressed down, do the seeking, but if the shift key IS pressed down, do the else block
			if(!e.shiftKey) {
				this.handleSeek(null, playedTime - 1)
				break
			} else {
				// Checking to make sure that the value of the playback rate is within the possible options
				if (this.props.viewstate.playbackRate > this.playbackOptions[0] && this.props.viewstate.playbackRate <= this.playbackOptions[this.playbackOptions.length - 1])
					this.handlePlaybackRateChange(this.playbackOptions[this.playbackOptions.findIndex(element => element === this.props.viewstate.playbackRate) - 1])

				break
			}
		case `Space`:
			this.handlePlayPause()
			break
		case `KeyF`:
			this.handleToggleFullscreen()
			break
		case `KeyC`:
			this.handleToggleSubtitles()
			break

		default:
			break
		}
	}

	censorRef = createRef(null)

	render() {
		const {
			ref,
			url,
			playing,
			playbackRate,
			// playbackOptions,
			progress,
			// playTime,
			volume,
			muted,
			blank,
			// videoComment,
			// commentPosition,
			duration,
			showTranscript,
			// toggleTranscript,
			// content,
			// subtitleTextIndex,
			displaySubtitles,
			indexToDisplay,
			isMobile,
			// censorPosition,
			// censorActive,
			clipTime,
			isLandscape,
			hasPausedClip,
			events,
		} = this.props.viewstate

		const {
			handleDuration,
			handleMouseOut,
			handleMouseOver,
			handlePause,
			handlePlay,
			handleStart,
			handleProgress,
			handleSeekChange,
			handlePlaybackRateChange, // eslint-disable-line no-unused-vars
			handleMuted,
			handleUnmuted,
			handleShowSubtitle,
			toggleTip, // eslint-disable-line no-unused-vars
			handlePlayPause,
			setHasPausedClip,
			handleAspectRatio,
			// handleOnReady
		} = this.props.handlers

		const handleOnProgress = ({ played, playedSeconds }) => {
			// eslint-disable-next-line no-unused-vars
			const t0 = performance.now()
			handleProgress(playedSeconds)
			document.getElementById(`seconds-time-holder`).innerText = playedSeconds
			const subtitles = displaySubtitles
			if(document.getElementById(`timeBarProgress`))
				document.getElementById(`timeBarProgress`).style.width = `${played * 100}%`
			if(document.getElementById(`time-dot`)) {
				document.getElementById(`time-dot`).style.left = played ?
					`calc(${played * 100}% - 2px)`
					:
					`calc(${played * 100}% - 2px)`
			}
			if(subtitles.content.length > 0)
				HandleSubtitle(playedSeconds, subtitles, 0, duration)

			if (clipTime.length > 0 && playedSeconds > clipTime[1]){
				if (!hasPausedClip){
					handlePause()
					setHasPausedClip(true)
				}
			}

			if(!events) return

			const values = CurrentEvents(playedSeconds, events, duration)

			for (let i = 0; i < values.censors.length; i++) CensorChange(i, values.censors[i], playedSeconds)
			for (let x = 0; x < values.comments.length; x++) CommentChange(x, values.comments[x].position)

			if(values.allEvents){
				if(values.allEvents.filter(e => e.type === `Mute`).length === 0){
					if (muted)
						handleUnmuted()
				}
			}
			for (let y = 0; y < values.allEvents.length; y++){
				let index = 0
				if (values.allEvents[y].type === `Pause`)
					index = events.findIndex(event => event.type === values.allEvents[y].type && event.start === values.allEvents[y].start)
				else
					index = events.findIndex(event => event.type === values.allEvents[y].type && event.start === values.allEvents[y].start && event.end === values.allEvents[y].end)
				if(!events[index].active)
					return
				const pauseMessage = document.getElementById(`pauseMessage`)
				const pauseMessageButton = `<button type='button' onclick={pauseMessage.style.visibility='hidden'}>Close</button>`
				switch(values.allEvents[y].type){
				case `Mute`:
					if(!muted)
						handleMuted()

					break
				case `Pause`:
					events[index].active = false
					handlePause()

					if(events[index].message){
						pauseMessage.style.visibility = `visible`
						pauseMessage.innerHTML = events[index].message + pauseMessageButton
					}
					break
				case `Skip`:
					events[index].active = false
					handleSeekChange(null, values.allEvents[y].end)
					break
				default:
					break
				}
			}

			for(let j = 0; j < values.doneEvents.length; j++){
				// needed for unmuting after muting event is done
				const index = events.findIndex(event => event.type === values.doneEvents[j].type && event.start === values.doneEvents[j].start && event.end === values.doneEvents[j].end)

				if(!events[index].active)
					return

				switch(values.doneEvents[j].type){
				case `Mute`:
					if(muted){
						handleUnmuted()
						events[index].active = false
					}
					break
				default:
					break
				}
			}
			// eslint-disable-next-line no-unused-vars
			const t1 = performance.now()
		}

		const alertMessage = `Video playback does not currently work on iOS devices or the Safari browser. <br><br>`

		const handleOnReady = () => {
			handleAspectRatio()
			if(events){
				const eventFilterSkip = events.filter((values) => {
					return values.type === `Skip` // TODO: Make sure this is fine
				})
				this.setState({skipArray: eventFilterSkip})
			}
		}

		return (
			<Style>
				<div style={
					{
						display: `${showTranscript !== false ? `flex` : `initial`}`,
						height: `100%`,
						overflow: `hidden`,
					}
				}>
					<div className='player-wrapper' id={`player-container`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ flex: 1 }}>
						<ReactPlayer
							ref={ref}
							className='react-player'
							width='100%'
							height='100%'
							url={url}
							playing={playing}
							playsinline={true}
							playbackRate={parseFloat(playbackRate)}
							volume={volume}
							muted={muted}
							onPlay={handlePlay}
							onPause={handlePause}
							onStart = {handleStart}
							onReady = {handleOnReady}
							onSeek={e => e}
							progressInterval={30}
							onProgress={handleOnProgress}
							// onProgressBar={handleOnReady}
							onDuration={handleDuration}

							config={{
								file: {
									forceVideo: true,
									hlsVersion: `0.12.4`,
									attributes: {
										disablePictureInPicture: true,
									},
								},
								youtube: {
									iv_load_policy: 3,
									modestbranding: 1,
									playsinline: 1,
									rel: 0,
									showinfo: 0,
								},
							}}
						/>
						<PlayerControls viewstate={this.props.viewstate} handlers={this.props.handlers} skipArray={this.state.skipArray}/>
						<Blank blank={blank} id='blank' onContextMenu={e => e.preventDefault()}>
							<PlayButton playing={playing} onClick={handlePlayPause} src={playButton} isMobile={isMobile} isLandscape={isLandscape}/>
							{/* eslint-disable-next-line jsx-a11y/heading-has-content */}
							<Subtitles id='subtitleBox'><h3 id='subtitle'></h3></Subtitles>
							<div id='censorContainer' style={{width: `100%`, height: `100%`, position: `absolute`, top: `0px`}}>
							</div>
							<div id ='commentContainer' style={{width: `100%`, height: `100%`, position: `absolute`, top: `0px`}}>
							</div>
							<PauseMessage id='pauseMessage'>
							</PauseMessage>
							<AlertMessage id='alertMessage'></AlertMessage>
						</Blank>
					</div>
					<Transcript viewstate={this.props.viewstate} handlers={this.props.handlers}>
					</Transcript>
				</div>
				{
					url !== `` && showTranscript ? (
						// showsubtitles
						<PlayerSubtitlesContainer
							currentTime={progress}
							duration={duration}
							handleShowSubtitle={handleShowSubtitle}
							indexToDisplay={indexToDisplay}
						/>
					) : null
				}
				<p id='seconds-time-holder' style={{ visibility: `hidden`, position: `absolute`, top: `0px`, right: `0px` }}></p>
			</Style>
		)
	}
}
