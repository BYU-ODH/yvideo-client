import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { interfaceService } from 'services'

import { Wrapper } from './styles'

// TODO: Separate or move this so that it doesn't break the container pattern

class Modal extends Component {
	toggleModal = this.props.toggleModal
	wrapper = createRef()

	handleToggleModal = (e) => {
		this.toggleModal(e)
	}
	render() {
		const Comp = this.props.modal.component

		if (!Comp) return null

		return ReactDOM.createPortal(
			(
				// so that when one clicks in the grey space around a modal it closes the modal
				<Wrapper id='wrapper' onClick={this.toggleModal} ref={this.wrapper} className=''>
					{/* e.stopPropagation() makes it so that when one is hovering over the actual modal, the onClick from the Wrapper doesn't take effect */}
					<div onClick={e => e.stopPropagation()}>
						<Comp {...this.props.modal.props} />
					</div>
				</Wrapper>
			),
			document.getElementById(`modal`),
		)
	}

	componentDidUpdate = prevProps => {
		const onKeyupTemp = document.onkeyup
		document.onkeyup = (e) => {
			if(e) {
				if(e.code === `Escape`) {
					this.toggleModal()
					document.onkeyup = onKeyupTemp
				}
			}
		}

		if (!this.wrapper.current) return

		if (!prevProps.active && this.props.active) {
			this.wrapper.current.classList.add(`active`)
			this.wrapper.current.classList.remove(`hidden`)
		}

		if (prevProps.active && !this.props.active) {
			// setTimeout(() => {
				this.wrapper.current.classList.remove(`active`)
				// setTimeout(() => {
					this.wrapper.current.classList.add(`hidden`)
				// }, 250)
			// }, 1000)
		}

	}

	componentWillUnmount() {
		document.onkeyup = null
	}

}

const mapStoreToProps = store => ({
	modal: store.interfaceStore.modal,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStoreToProps, mapDispatchToProps)(Modal)
