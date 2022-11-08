import React, { useEffect } from 'react'
import Style, { LinkStyled, Header, LogoutButton, Footer, MenuIcon, UserPic, AStyled } from './styles'

const Menu = props => {

	const {
		user,
		initials,
		menuActive,
		isProf,
		isAdmin,
		isLab,
		editorStyle,
	} = props.viewstate

	const {
		toggleMenu,
		menuClose,
		handleShowTip,
		handleLogout,
		toggleTip,
	} = props.handlers

	useEffect(() => {
		const onClickTemp = window.onclick
		window.onclick = e => {
			menuClose(e)
			window.onclick = onClickTemp
		}
		return () => window.onclick = null
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props])

	return (
		// display only if user is not a guest
		user.roles < 4 ?
			<Style
				className={menuActive && `active`}
				editorStyle={editorStyle}
				onMouseEnter={e => handleShowTip(`menu`,
					{
						x: window.innerWidth - 300,
						y: 54,
						width: e.currentTarget.offsetWidth,
					})
				}
				onMouseLeave={() => toggleTip()}
				onClick={e => e.stopPropagation()}
			>

				{/* <UserPic>{initials}</UserPic> */}
				<MenuIcon className='std-outline-color' onClick={toggleMenu}/>

				{user.name.includes(`no_name`) ?
					<h4>{user.username}</h4>
					:
					<h4>{user.name}</h4>
				}
				<hr />

				{/* <LinkStyled to='/word-list'>My Word List</LinkStyled> */}

				{
					isAdmin &&
				<>
					<LinkStyled className='std-outline-color' to='/admin' onClick={toggleMenu}>Admin Dashboard</LinkStyled>
				</>
				}

				{ (isLab || isAdmin) &&
				<>
					<LinkStyled className='std-outline-color' to='/lab-assistant' onClick={toggleMenu}>Lab Assistant Dashboard</LinkStyled>
					<LinkStyled className='std-outline-color' to='/manage-resource' onClick={toggleMenu}>Manage Resource</LinkStyled>
				</>
				}

				{
					!(isLab || isAdmin || isProf) &&
				<>
					<LinkStyled className='std-outline-color' to='/' onClick={toggleMenu}>Collections</LinkStyled>
				</>
				}

				<LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>

				{
					(isProf || isAdmin || isLab) &&
				<>
					<Header>Collections</Header>
					<hr />
					<LinkStyled className='std-outline-color' to='/' onClick={toggleMenu}>Collections</LinkStyled>
					<LinkStyled className='std-outline-color' to='/manager' onClick={toggleMenu}>Manage Collections</LinkStyled>
					{
						isAdmin &&
						<>
							<LinkStyled className='std-outline-color' to='/public-manager' onClick={toggleMenu}>Manage Public Collections</LinkStyled>
						</>
					}
					{/* <LinkStyled to={{ pathname: `/manager`, createCollection: true }}>Create New Collection</LinkStyled> */}
				</>
				}

				<Header>Connect With Us</Header>
				<hr />
				<LinkStyled to='/feedback' className='std-outline-color' onClick={toggleMenu}>Contact Us</LinkStyled>
				<AStyled href={process.env.REACT_APP_PRIVACY_LINK} target='_blank' rel='noopener noreferrer' className='std-outline-color'>Privacy Notice</AStyled>
				<AStyled href={process.env.REACT_APP_COOKIE} target='_blank' rel='noopener noreferrer' className='std-outline-color'>Cookie Preferences</AStyled>

			</Style>
			:
			// menu options for the guest user
			<Style editorStyle={editorStyle} className={menuActive && `active`}
				onClick={toggleMenu}
				onMouseEnter={e => handleShowTip(`menu`,
					{
						x: window.innerWidth - 270,
						y: 50,
						width: e.currentTarget.offsetWidth,
					})
				}
				onMouseLeave={() => toggleTip()}>

				<UserPic>{initials}</UserPic>
				<h4>{user.name}</h4>

				<hr />

				<LinkStyled to='/'>Sign in</LinkStyled>

				<Footer>
					<Header>Connect With Us</Header>
					<hr />
					<LinkStyled to='/feedback' >Contact Us</LinkStyled>
					<AStyled href={process.env.REACT_APP_PRIVACY_LINK} target='_blank' rel='noopener noreferrer' className='std-outline-color'>Privacy Notice</AStyled>
					<AStyled href={process.env.REACT_APP_COOKIE} target='_blank' rel='noopener noreferrer' className='std-outline-color'>Cookie Preferences</AStyled>
				</Footer>

			</Style>

	)
}

export default Menu
