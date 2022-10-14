import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { Wrapper, Spinner } from './styles'

const Load = props => {

	const {
		loading,
	} = props

	const wrapper = useRef()
	const wrapperCurrent = wrapper.current
	const [propsState, setPropsState] = useState({loading: true})

	useEffect(() => {
		if (!wrapperCurrent || wrapperCurrent === null) return

		else{
			if (!propsState.loading && loading) {
				wrapperCurrent.classList.add(`active`)
				wrapperCurrent.classList.remove(`hidden`)
			}

			if (propsState.loading && !loading) {
				setTimeout(() => {
					wrapperCurrent.classList.remove(`active`)
					setTimeout(() => {
						wrapperCurrent.classList.add(`hidden`)
					}, 250)
				}, 1000)
			}
		}
		setPropsState(props)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props])

	return ReactDOM.createPortal(
		(
			<Wrapper ref={wrapper} className='active'>
				<Spinner />
			</Wrapper>
		),
		document.getElementById(`load`),
	)
}

export default Load
