import React from 'react'
import { Link } from 'react-router-dom'
import Style, { Slash } from './styles'

const Breadcrumb = props => {

	const {crumbs } = props.viewstate
	const { isLast, toLink, isManager, isPlayer } = props.handler
	return (
		<Style>
			<div>
				{
					Object.values(crumbs.path).map((crumb, ci) => {
						const disabled = isLast(ci) ? `disabled` : ``
						const link = toLink(crumb)
						return (
							<span
								key={ ci }
								className='breadcrumb-item align-items-center'
							>
								{
									isManager(crumb) ?
										disabled ?
											<button><Link to={`/${link}/${crumbs.collectionId}`} onClick={() => window.location.reload()}>{ crumb }</Link></button>
											:
											<button><Link to={`/${link}/${crumbs.collectionId}`}>{ crumb }</Link></button>
										:
										isPlayer(crumb) ?
											disabled ?
												<button><Link to={`/${link}/${crumbs.contentId}`} onClick={() => window.location.reload()}>{ crumb }</Link></button>
												:
												<button><Link to={`/${link}/${crumbs.contentId}`}>{ crumb }</Link></button>
											:
											disabled ?
												<button><Link to={`/${link}`} onClick={() => window.location.reload()}>{ crumb }</Link></button>
												:
												<button><Link to={`/${link}`}>{ crumb }</Link></button>

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