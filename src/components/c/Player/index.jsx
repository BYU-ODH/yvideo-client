import React, { PureComponent } from 'react'

import ReactPlayer from 'react-player'

import { CollectionsContainer, EventsContainer } from 'containers'
import { PlayerControls } from 'components/bits'

import { Controller } from 'components'

import Style, { Blank, Comment, Transcript } from './styles'

import chevron from 'assets/te-chevron-left.svg'

export default class Player extends PureComponent {
	componentDidMount(){
		// setTimeout(() => {
		// 	const {url} = this.props.viewstate
		// 	if (!url) alert(`No media found, please check to see if you have the correct URL`)
		// }, 4000)

	}

	render() {
		const {
			ref,
			url,
			playing,
			playbackRate,
			progress,
			volume,
			muted,
			blank,
			videoComment,
			commentPosition,
			duration,
			showTranscript,
			toggleTranscript,
			content,
		} = this.props.viewstate

		const {
			handleDuration,
			handleMouseOut,
			handleMouseOver,
			handlePause,
			handlePlay,
			handleProgress,
			handleSeekChange,
			handlePlaybackRateChange,
			handleBlank,
			handleMuted,
			handleUnmuted,
			handleShowComment,
			setToggleTranscript,
		} = this.props.handlers


		const mySub = [
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:06.000',
				end: '00:00:12,000',
				text: "bla bla bla bla bla bla bla "
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			{
				start: '00:00:00.750',
				end:'00:00:05,750',
				text: "Your predilections for the bottle are tearing this family apart!, Your predilections for the bottle are tearing this family apart!"
			},
			
		]

		//console.log('%c URL', 'font-size: 18px; color: green;', url)

		return (
			<Style>
				<div style={{ display: `${showTranscript !== false ? ('flex') : ('initial')}` }}>
					<div className='player-wrapper' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ flex: 1}}>
						<ReactPlayer
							ref={ref}
							className='react-player'
							width='100%'
							height='50rem'
							url={url}
							playing={playing}
							playbackRate={parseFloat(playbackRate)}
							volume={volume}
							muted={muted}
							// onReady={() => console.log(`onReady`)}
							// onStart={() => console.log(`onStart`)}
							onPlay={handlePlay}
							onPause={handlePause}
							// onBuffer={() => console.log(`onBuffer`)}
							onSeek={e => console.log(`onSeek`, e)}
							// onError={e => console.log(`onError`, e)}
							progressInterval={100}
							onProgress={handleProgress}
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
								}
							}}
						/>
						<PlayerControls viewstate={this.props.viewstate} handlers={this.props.handlers} />
						<Blank blank={blank} id='blank' onContextMenu={e => e.preventDefault()}>
							<Comment commentX={commentPosition.x} commentY={commentPosition.y}>{videoComment}</Comment>
							{/* <Censor x={censorPosition[0]} y={censorPosition[1]} active={censorActive} wProp={censorPosition[2]} hProp={censorPosition[3]}><canvas></canvas></Censor> */}
						</Blank>
					</div>
					<Transcript style={{ display: `${showTranscript !== false ? ('initial') : ('none')}` }} displayTranscript={toggleTranscript}>
						<div className={'side-bar'}>
							<img src={chevron} className={'toggle-transcript'} onClick={e => setToggleTranscript(!toggleTranscript)}/>
						</div>
						<div className={'main-bar'}>
							<div className={'transcript-title'}>
								<h2>Transcript View - {content !== undefined ? (content.settings.targetLanguages) : (null)}</h2>
							</div>
							<div className={'transcript-content'}>
								{
									mySub.map((element, index) =>
										<div key={index} className={"transcript-row"} onClick={e => handleSeekChange(null, element.start.split(':').reduce((acc,time) => (60 * acc) + +time))}>
											<p>{element.text}</p>
										</div>
									)
								}
								<br/>
							</div>
						</div>
					</Transcript>
				</div>
				{/* <div className={`collection-container`}>
					<CollectionsContainer/>
				</div> */}
				<EventsContainer currentTime={progress.playedSeconds.toFixed(1)} duration={duration}
					handleSeek={handleSeekChange}
					handleMute={handleMuted}
					handlePlay={handlePlay}
					handlePause={handlePause}
					handleUnMute={handleUnmuted}
					// toggleMute={toggleMute}
					handleBlank={handleBlank}
					handleShowComment={handleShowComment}
					// handleCensorPosition={video.handleCensorPosition}
					// handleCensorActive={video.handleCensorActive}
				></EventsContainer>
			</Style>
		)
	}


	// render(){

	// 	return (
	// 		<>
	// 			<br/><br/><br/><br/><br/><br/>
	// 			<h2>Local Cat video HTML5</h2>
	// 			<video src={videoFile} width="600" height="200" controls  />
	// 			<br/><br/>
	// 			<h2>Server Cat video HTML5</h2>
	// 			<video src={'https://yvideobeta.byu.edu/static/cat_sleep.mp4'} width="600" height="200" controls  />
	// 			<br/><br/>
	// 			<h2>Local Cat video ReactPlayer</h2>
	// 			<ReactPlayer 
	// 				controls={true}
	// 				url={videoFile}
	// 				width="600px"
	// 				height="200px"

	// 			/>
	// 			<br/><br/>
	// 			<h2>Server Cat video ReactPlayer</h2>
	// 			<ReactPlayer 
	// 				controls={true}
	// 				url={'https://yvideobeta.byu.edu/static/cat_sleep.mp4'}
	// 				width="600px"
	// 				height="200px"

	// 			/>
	// 		</>
	// 	)
	// }	
}