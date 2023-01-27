import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {interfaceService} from 'services'

import ComfirmationBox from '../components/ConfirmationBox'

const ComfirmationBoxContainer = props => {

	const {
		index,
		startOrEnd,
		toggleModal,
		singleEvent,
		updateEvents,
	}= props

	const [event, setEvent] = useState(singleEvent)

	useEffect(() => {
		setEvent(singleEvent)
	}, [index, event, singleEvent])

	const editEvent = (side, time, value, layer, ind, type) => {
		const ev = {...event}
		if (side === `beg`) {
			ev.start = time
			ev.end = singleEvent.end
			ev.text = singleEvent.text

		} else if(side === `end`) {
			ev.start = singleEvent.start
			ev.end = time
		}

		try{
			if(!side) {
				ev.text = value.target.value
				ev.start = singleEvent.start
				ev.end = singleEvent.end
			}
		}catch(error){
			console.log(error) // eslint-disable-line no-console
		}
		setEvent(ev)
		updateEvents(ind, event, layer, side, type)
	}

	const handleInputChange = (e, index, type, startOrEnd) => {
		const cEvent = event
		const layer = cEvent.layer

		if(startOrEnd == `start`){
			const cEvent = event
			const layer = cEvent.layer

			if (e.target.value === ``) {
				cEvent.start = e.target.value
				setEvent(cEvent)
				editEvent(`beg`, cEvent.start, null, layer, index, type)
			}
		}
		else {
			const cEvent = event
			const layer = cEvent.layer
			if (e.target.value === ``) {
				cEvent.end = e.target.value
				setEvent(cEvent)
				// updateEvents(index, cEvent, layer, `end`)
				editEvent(`end`, cEvent.end, null, layer, index, type)
			}
		}
		toggleModal()
	}


	const viewstate = {
		index,
		startOrEnd,
		singleEvent,
	}

	const handlers = {
		toggleModal,
		handleInputChange,
		updateEvents,

	}

	return <ComfirmationBox viewstate={viewstate} handlers={handlers}/>

}

const mapStoreToProps = store => ({
	modal: store.interfaceStore.modal,
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	toggleTip: interfaceService.toggleTip,
}

export default connect(mapStoreToProps, mapDispatchToProps)(ComfirmationBoxContainer)
