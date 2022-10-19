import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { interfaceService } from 'services'

import { Wrapper } from './styles'

// TODO: Separate or move this so that it doesn't break the container pattern

const Modal = props => {

	const { modal, toggleModal, active } = props

	const wrapper = useRef()
	const Comp = modal.component

	const [propsState, setPropsState] = useState({active: false})

	const handleToggleModal = (e) => {
		toggleModal(e)
	}

	useEffect(() => {

		const onKeyupTemp = document.onkeyup
		document.onkeyup = (e) => {
			if(e) {
				if(e.code === `Escape`) {
					handleToggleModal(e)
					document.onkeyup = onKeyupTemp
				}
			}
		}

		if (!wrapper.current) return

		if (!propsState.active && active) {
			wrapper.current.classList.add(`active`)
			wrapper.current.classList.remove(`hidden`)
		}

		if (!propsState.active && !active) {
			setTimeout(() => {
				wrapper.current.classList.remove(`active`)
				setTimeout(() => {
					wrapper.current.classList.add(`hidden`)
				}, 250)
			}, 1000)
		}
		setPropsState(props)

		/* acts on unmount */
		return () => document.onkeyup = null
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props])

	if (!Comp) return null

	return ReactDOM.createPortal(
		(
			// so that when one clicks in the grey space around a modal it closes the modal
			<Wrapper id='wrapper' onClick={toggleModal} ref={wrapper} className=''>
				{/* e.stopPropagation() makes it so that when one is hovering over the actual modal, the onClick from the Wrapper doesn't take effect */}
				<div onClick={e => e.stopPropagation()}>
					<Comp {...modal.props} />
				</div>
			</Wrapper>
		),
		document.getElementById(`modal`),
	)
}

const mapStoreToProps = store => ({
	modal: store.interfaceStore.modal,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStoreToProps, mapDispatchToProps)(Modal)
