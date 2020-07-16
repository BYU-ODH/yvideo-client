import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Wrapper, Spinner } from './styles'

class Load extends Component {

	render() {
		return ReactDOM.createPortal(
			(
				<Wrapper ref={this.wrapper} className='hidden'>
					<Spinner />
				</Wrapper>
			)
			,
			document.getElementById('load'))
	}

	componentDidUpdate = prevProps => {

		console.log(this.props)

		if (!prevProps.loading && this.props.loading) {
			this.wrapper.current.classList.add('active')
			this.wrapper.current.classList.remove('hidden')
		}
	}

}

export default Load