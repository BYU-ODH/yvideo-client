import React, { PureComponent } from 'react'
import Style, { LinkStyled, Header, LogoutButton, Footer, MenuIcon } from './styles'

class Menu extends PureComponent {
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
			handleShowTip,
			handleLogout,
			toggleTip,
		} = this.props.handlers

		return (
			<Style editorStyle={editorStyle} className={menuActive && `active`}
				onClick={toggleMenu}
				onMouseEnter={e => handleShowTip(`menu`, {x: window.innerWidth - 270, y: 50, width: e.currentTarget.offsetWidth})}
				onMouseLeave={e => toggleTip()}>

				<MenuIcon />

				<hr />

				{/* <LinkStyled to='/word-list'>My Word List</LinkStyled> */}

				{
					isAdmin &&
					<>
						<LinkStyled to='/admin'>Admin Dashboard</LinkStyled>
					</>
				}

				{ (isLab || isAdmin) &&
					<>
						<LinkStyled to='/lab-assistant'>Lab Assistant Dashboard</LinkStyled>
						<LinkStyled to='/manage-resource'>Manage Resource</LinkStyled>
					</>
				}

				{
					!(isLab || isAdmin || isProf) &&
					<>
						<LinkStyled to='/'>Collections</LinkStyled>
					</>
				}

				<LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>

				{
					(isProf || isAdmin || isLab) &&
					<>
						<Header>Collections</Header>
						<hr />
						<LinkStyled to='/'>View Collections</LinkStyled>
						<LinkStyled to='/manager'>Manage Collections</LinkStyled>
						{
							isAdmin &&
							<>
								<LinkStyled to='/public-manager'>Public Collections</LinkStyled>
							</>
						}
						<LinkStyled to={{ pathname: `/manager`, createCollection: true }}>Create New Collection</LinkStyled>
					</>
				}

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