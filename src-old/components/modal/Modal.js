import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { toggleModal } from 'redux/actions'

import styled from 'styled-components'

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0,0,0,0.5);
	z-index: 40;

	opacity: ${props => props.done ? 0 : 1};
	transition: opacity .25s ease-in-out;

	display: flex;
	justify-content: center;
	align-items: center;

	& > div {
		border-radius: .3rem;
		padding: 4rem 5rem;
		background: white;

		position: relative;
	}
`

const modal = document.getElementById(`modal`)

class Modal extends Component {
	constructor(props) {
		super(props)
		this.el = document.createElement(`div`)
	}

	componentDidMount() {
		modal.appendChild(this.el)
	}

	componentWillUnmount() {
		modal.removeChild(this.el)
	}

	render() {
		const Component = this.props.modal.component === null ? null : this.props.modal.component
		return ReactDOM.createPortal(<Container>
			<div>
				<Component toggleModal={this.props.toggleModal} />
			</div>
		</Container>,
			this.el)
	}
}

const mapStateToProps = ({ modal }) => ({
	modal
})

const mapDispatchToProps = {
	toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
