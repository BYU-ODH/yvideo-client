import React from 'react'
import { Link } from 'react-router-dom'
import Style, { Slash, Button } from './styles'

const Breadcrumb = props => {

	const { crumbs } = props.viewstate
	const { isLast, toLink, isManager, isPlayer } = props.handlers
	return (
		<Style>
			<div>
				{
					Object.values(crumbs.path).map((crumb, index) => {
						const isDisabled = isLast(index)
						const link = toLink(crumb)
						return (
							<span key={index} className='breadcrumb-item align-items-center'>
								{
									isManager(crumb) ?
										isDisabled ?
											<Button disabled={isDisabled}><span className='std-outline-color'>{ crumb }</span></Button>
											:
											<Button disabled={isDisabled}><Link className='std-outline-color' to={`/${link}/${crumbs.collectionId}`}>{ crumb }</Link></Button>
										:
										isPlayer(crumb) ?
											isDisabled ?
												<Button disabled={isDisabled}><span className='std-outline-color'>{ crumb }</span></Button>
												:
												<Button disabled={isDisabled}><Link className='std-outline-color' to={`/${link}/${crumbs.contentId}`}>{ crumb }</Link></Button>
											:
											isDisabled ?
												<Button disabled={isDisabled}><span className='std-outline-color'>{ crumb }</span></Button>
												:
												<Button disabled={isDisabled}><Link className='std-outline-color' to={`/${link}`}>{ crumb }</Link></Button>
								}
								<Slash disabled={isDisabled}> / </Slash>
							</span>
						)
					})
				}
			</div>
		</Style>
	)
}

export default Breadcrumb
