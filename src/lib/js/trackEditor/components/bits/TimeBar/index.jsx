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

		const handleScrubChange = value => {
			// alert(value)
			console.log(value)
		}

		const value = 50

		return (
			<Style>
				{/* <Scrubber />
				<p style={styles}>Hey</p> */}
				{/* //https://github.com/nick-michael/react-scrubber */}
				<div className='scrubber-container' style={{ height:  `20px` }}>
					<Scrubber
						min={0}
						max={100}
						value={value}
						// onScrubStart={this.handleScrubStart}
						// onScrubEnd={this.handleScrubEnd}
						onScrubChange={handleScrubChange}
					/>
				</div>
			</Style>
		)
	}
}

export default TimeBar