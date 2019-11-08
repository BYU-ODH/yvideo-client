import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'

import { Wrapper, Spinner } from './styles'

class LoadComponent extends Component {

	wrapper = createRef()

	render() {
		return ReactDOM.createPortal(
			(
				<Wrapper ref={this.wrapper} className='active'>
					<Spinner />
				</Wrapper>
			),
			document.getElementById(`load`)
		)
	}

	shouldComponentUpdate = nextProps => {

		if (!this.props.loading && nextProps.loading) {
			this.wrapper.current.classList.add(`active`)
			this.wrapper.current.classList.remove(`hidden`)
		}

		if (this.props.loading && !nextProps.loading) {
			setTimeout(() => {
				this.wrapper.current.classList.remove(`active`)
				setTimeout(() => {
					this.wrapper.current.classList.add(`hidden`)
				}, 250)
			}, 1000)
		}

		return false
	}

}

export const Load = LoadComponent