import React from 'react'
import ReactDOM from 'react-dom'

import Spin from './Spin'

const load = document.getElementById('load')

class Load extends React.Component {
	constructor(props) {
		super(props)
		this.el = document.createElement('div')
	}

	componentDidMount() {
		load.appendChild(this.el)
	}

	componentWillUnmount() {
		load.removeChild(this.el)
	}

	render() {
		return ReactDOM.createPortal(<Spin />,
			this.el)
	}
}

export default Load