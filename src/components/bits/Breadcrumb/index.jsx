import React from 'react'
import { Link } from 'react-router-dom'
import Style, { Slash } from './styles'

function Breadcrumb(props) {

	const isLast = (index) => {
		return index === props.crumbs.length - 1
	}

	const toLink = (name) => {
		let link = ``

		switch(name) {
		case `Home`:
			link = `/`
			break
		case `Manage Collections`:
			link = `/manager`
			break
		default:
			link = `/`
		}

		return link
	}

	return (
		<Style>
			<div>
				{
					props.crumbs.map((crumb, ci) => {
						const disabled = isLast(ci) ? `disabled` : ``
						const link = toLink(crumb)
						return (
							<span
								key={ ci }
								className='breadcrumb-item align-items-center'
							>
								{/* <button to={`/manager`}>
									{ crumb }
								</button> */}
								<button><Link to={link} >{ crumb }</Link></button>

								<Slash disabled={disabled}> / </Slash>
							</span>
						)
					})
				}
			</div>
		</Style>
	)
}

export default Breadcrumb