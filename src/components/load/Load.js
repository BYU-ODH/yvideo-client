import React, { memo } from 'react'
import ReactDOM from 'react-dom'

import styled from 'styled-components'

import Spin from './Spin'

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: white;

	opacity: ${props => props.done ? 0 : 1};
	transition: opacity .25s ease-in-out;

	z-index: 50;
`

const load = document.getElementById(`load`)

class Load extends React.Component {
	constructor(props) {
		super(props)
		this.el = document.createElement(`div`)
	}

	componentDidMount() {
		load.appendChild(this.el)
	}

	componentWillUnmount() {
		load.removeChild(this.el)
	}

	render() {
		return ReactDOM.createPortal(<Container loading={this.props.loading} done={this.props.done}><Spin /></Container>,
			this.el)
	}
}

export default memo(Load)