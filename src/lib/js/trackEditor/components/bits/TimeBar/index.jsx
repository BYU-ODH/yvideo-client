import React, { PureComponent } from 'react'

import { Scrubber } from 'react-scrubber'
// import { Scrubber } from 'components/bits'

import Style from './styles'

class TimeBar extends PureComponent {

	render() {
	// Export to seperate file

		const styles = {
			display: `inline-block`,
			color: `purple`,
		}

		// const handleScrubChange = value => {
		// 	// alert(value)
		// 	console.log(value)
		// 	const totalTime = 30
		// 	console.log(`Adjusted time: `, totalTime * (value / 100))
		// 	// Get time based on percentage
		// }

		const {
			currentTime,
			totalTime,
		} = this.props.viewstate

		const {
			handleVideoScrubChange,
		} = this.props.handlers

		// const value = 50

		const percentageComplete = currentTime / totalTime * 100

		return (
			<Style>
				{/* <Scrubber />
				<p style={styles}>Hey</p> */}
				{/* //https://github.com/nick-michael/react-scrubber */}
				<div className='scrubber-container' style={{ height:  `20px` }}>
					<Scrubber
						min={0}
						max={100}
						value={percentageComplete}
						// onScrubStart={this.handleScrubStart}
						// onScrubEnd={this.handleScrubEnd}
						onScrubChange={handleVideoScrubChange}
					/>
				</div>
			</Style>
		)
	}
}

export default TimeBar