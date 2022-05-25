import React, { PureComponent } from 'react'
import Style, { LinkStyled, Header, LogoutButton, Footer, MenuIcon, UserPic } from './styles'

class Menu extends PureComponent {
	constructor(props){
		super(props)
		this.toggleMenu = this.props.handlers.toggleMenu
		this.menuClose = this.props.handlers.menuClose
		this.menuActive = this.props.viewstate.menuActive

	}

	componentDidMount() {
		window.onclick = (e) => {
			this.menuClose(e)
		}
	}

	componentWillUnmount() {
		window.onclick = null
	}

	render() {

		const {
			user,
			initials,
			menuActive,
			isProf,
			isAdmin,
			isLab,
			editorStyle,
		} = this.props.viewstate

		const {
			toggleMenu,
			// menuOpen,
			// menuClose,
			handleShowTip,
			handleLogout,
			toggleTip,
		} = this.props.handlers
		return (
			// display only if user is not a guest
			user.roles < 4 ?
				<Style editorStyle={editorStyle} className={menuActive && `active`}
					onMouseEnter={e => handleShowTip(`menu`,
						{
							x: window.innerWidth - 270,
							y: 50,
							width: e.currentTarget.offsetWidth
						})
					}
					onMouseLeave={e => toggleTip()}
					onClick={e => {
						e.stopPropagation()
					}}
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

					<Footer>
						<Header>Connect With Us</Header>
						<hr />
						<LinkStyled to='/feedback' className='std-outline-color' onClick={toggleMenu}>Contact Us</LinkStyled>
					</Footer>

				</Style>
				:
				// menu options for the guest user
				<Style editorStyle={editorStyle} className={menuActive && `active`}
					onClick={toggleMenu}
					onMouseEnter={e => handleShowTip(`menu`,
						{
							x: window.innerWidth - 270,
							y: 50,
							width: e.currentTarget.offsetWidth
						})
					}
					onMouseLeave={e => toggleTip()}>

					<UserPic>{initials}</UserPic>
					<h4>{user.name}</h4>

					<hr />

					<LinkStyled to='/'>Sign in</LinkStyled>

					<Footer>
						<Header>Connect With Us</Header>
						<hr />
						<LinkStyled to='/feedback' >Contact Us</LinkStyled>
					</Footer>

				</Style>

		)
	}
}

export default Menu
