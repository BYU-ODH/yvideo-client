import React, { PureComponent, createRef } from 'react'

import Style, {ClosePreview} from './styles'

import ReactPlayer from 'react-player'

import {PlayPauseButton, BarPreview} from 'components/bits'
import closeIcon from 'assets/x.svg'

export default class PreviewFiles extends PureComponent {
	constructor(props){
		super(props)
		this.handleSeek = (e, time) => this.props.handlers.handleSeekChange(e, time)
		this.handlePlayPause = (bool) => this.props.handlers.handlePlayPause(bool)
		this.handleProgress = () => this.props.handlers.handleProgress
	}

	componentDidMount(){
		// setTimeout(() => {
		// 	const {url} = this.props.viewstate
		// 	if (!url) alert(`No media found, please check to see if you have the correct URL`)
		// }, 4000)
		// if (this.props.clipTime) if(this.props.clipTime.length > 0) this.props.ref.seekto(this.props.clipTime[0])
	}
	censorRef = createRef(null)

	render() {
		const {
			handleAspectRatio,
			handleStart,
			handlePlay,
			handlePause,
			handleProgress,
			handleDuration,
			handleMouseOut,
			handleMouseOver,
		} = this.props.handlers

		const {
			ref,
			playing,
			url,
			volume,
		} = this.props.viewstate

		const handleOnProgress = ({ played, playedSeconds }) => {
			handleProgress(playedSeconds)
			if(document.getElementById(`time-bar-progress`))
				document.getElementById(`time-bar-progress`).style.width = `${played * 100}%`
			if(document.getElementById(`time-dot`)) {
				document.getElementById(`time-dot`).style.left = played ?
					`calc(${played * 100}% - 2px)`
					:
					`calc(${played * 100}% - 2px)`
			}
		}

		return(
			<Style>
				<ClosePreview onClick={this.props.toggleModal}><img alt='' src={closeIcon} /></ClosePreview>
				<div style={{ height: `100%`, overflow: `hidden`}}>
					<div className='player-wrapper' id={`player-container`} style={{ flex: 1 }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
						<ReactPlayer
							ref={ref}
							className='react-player'
							width='100%'
							height='100%'
							url={url}
							playing={playing}
							volume={volume}
							onStart = {handleStart}
							onReady = {handleAspectRatio}
							onPlay = {handlePlay}
							onPause = {handlePause}
							onSeek={e => e}
							progressInterval={30}
							onProgress={handleOnProgress}
							onDuration={handleDuration}

							config={{
								youtube: {
									iv_load_policy: 3,
									modestbranding: 1,
									playsinline: 1,
									rel: 0,
									showinfo: 0,
								},
								file: {
									attributes: {},
								},
							}}
						/>
						<PlayPauseButton handlePlay={handlePlay} handlePause={handlePause} playing={playing} style={{position:`absolute`}}/>
						<BarPreview viewstate={this.props.viewstate} handlers={this.props.handlers}/>
					</div>
				</div>

			</Style>
		)
	}
}
