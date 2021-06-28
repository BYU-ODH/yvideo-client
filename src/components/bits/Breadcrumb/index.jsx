import React from 'react'
import { Link } from 'react-router-dom'
import Style, { Slash } from './styles'

const Breadcrumb = props => {

	const {crumbs, id } = props.viewstate
	const { isLast, toLink } = props.handler

	return (
		<Style>
			<div>
				{
					crumbs.map((crumb, ci) => {
						const disabled = isLast(ci) ? `disabled` : ``
						const link = toLink(crumb)
						return (
							<span
								key={ ci }
								className='breadcrumb-item align-items-center'
							>
								{
									isLast(ci)?
										id ?
											<button><Link to={link/id } onClick={() => window.location.reload()}>{ crumb }</Link></button>
											:
											<button><Link to={link} onClick={() => window.location.reload()}>{ crumb }</Link></button>
										:
										id ?
											<button><Link to={link/id }>{ crumb }</Link></button>
											:
											<button><Link to={link}>{ crumb }</Link></button>
								}

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