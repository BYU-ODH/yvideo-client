import React, { Component } from 'react'

const delayUnmount = Comp =>
	class extends Component {
		state = {
			shouldRender: this.props.isMounted,
		}

		componentDidUpdate(prevProps) {
			if (prevProps.isMounted && !this.props.isMounted) {
				setTimeout(
					() => this.setState({ shouldRender: false }),
					this.props.delayTime
				)
			} else if (!prevProps.isMounted && this.props.isMounted)
				this.setState({ shouldRender: true })
		}

		render() {
			return this.state.shouldRender ? <Comp {...this.props} /> : null
		}
	}

export default delayUnmount