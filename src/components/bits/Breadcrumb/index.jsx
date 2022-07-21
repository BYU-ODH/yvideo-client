import React from 'react'
import { Link } from 'react-router-dom'
import Style, { Slash } from './styles'

const Breadcrumb = props => {

	const { crumbs } = props.viewstate
	const { isLast, toLink, isManager, isPlayer } = props.handlers
	return (
		<Style>
			<div>
				{
					Object.values(crumbs.path).map((crumb, index) => {
						const disabled = isLast(index)
						const link = toLink(crumb)
						return (
							<span key={index} className='breadcrumb-item align-items-center'>
								{
									isManager(crumb) ?
										disabled ?
											<button><Link className='std-outline-color' to={`/${link}/${crumbs.collectionId}`} onClick={() => window.location.reload()}>{ crumb }</Link></button>
											:
											<button><Link className='std-outline-color' to={`/${link}/${crumbs.collectionId}`}>{ crumb }</Link></button>
										:
										isPlayer(crumb) ?
											disabled ?
												<button><Link className='std-outline-color' to={`/${link}/${crumbs.contentId}`} onClick={() => window.location.reload()}>{ crumb }</Link></button>
												:
												<button><Link className='std-outline-color' to={`/${link}/${crumbs.contentId}`}>{ crumb }</Link></button>
											:
											disabled ?
												<button><Link className='std-outline-color' to={`/${link}`} onClick={() => window.location.reload()}>{ crumb }</Link></button>
												:
												<button><Link className='std-outline-color' to={`/${link}`}>{ crumb }</Link></button>

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