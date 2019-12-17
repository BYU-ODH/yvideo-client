import React from 'react'
import Style, { Circle, Groove } from './styles'

const SwitchToggle = props => {
	const { on, setToggle, size } = props
	return (
		<Style onClick={setToggle} size={size} className={`switch-toggle`} data-key={props.data_key}>
			<Circle on={on} size={size} data-key={props.data_key} />
			<Groove on={on} size={size} data-key={props.data_key} />
		</Style>
	)
}

export default SwitchToggle
