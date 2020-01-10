import React, { PureComponent } from 'react'
import { Wrapper, LinkStyled, Header, UserPic, LogoutButton } from './styles'

class Menu extends PureComponent {
	render() {

		const {
			user,
			initials,
			menuActive,
			isProf,
			isAdmin,
		} = this.props.viewstate

		const {
			toggleMenu,
			createCollection,
			handleLogout,
		} = this.props.handlers

		return (
			<Wrapper className={menuActive && `active`} onClick={toggleMenu}>

				<UserPic>{initials}</UserPic>
				<h4>{user.name}</h4>

				<hr />

				{/* <LinkStyled to='/word-list'>My Word List</LinkStyled> */}

				{
					isProf || isAdmin ||
					<LinkStyled to='/collections'>Collections</LinkStyled>
				}

				{
					isAdmin && <LinkStyled to='/admin'>Admin Dashboard</LinkStyled>
				}

				<LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>

				{
					(isProf || isAdmin) &&
					<>
						<Header>Collections</Header>
						<hr />
						<LinkStyled to='/collections'>View Collections</LinkStyled>
						<LinkStyled to='/manager'>Manage Collections</LinkStyled>
						<LinkStyled to='/manager' onClick={createCollection}>Create New Collection</LinkStyled>
					</>
				}

			</Wrapper>
		)
	}
}

export default Menu