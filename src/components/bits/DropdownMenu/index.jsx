import React, { PureComponent } from 'react'

export default class DropdownMenu extends PureComponent {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}
