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

				<LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>

				{
					(isProf || isAdmin) &&
					<>
						<Header>Collections</Header>
						<hr />
						<LinkStyled to='/collections'>View Collections</LinkStyled>
						<LinkStyled to='/manager'>Manage Collections</LinkStyled>
						<LinkStyled to={{ pathname: `/manager`, createCollection: true }}>Create New Collection</LinkStyled>
					</>
				}

				{
					isAdmin &&
					<>
						<Header>Admin</Header>
						<hr />
						<LinkStyled to='/admin/users'>Users</LinkStyled>
						<LinkStyled to='/admin/collections'>Collections</LinkStyled>
						<LinkStyled to='/admin/content'>Content</LinkStyled>
					</>
				}

			</Wrapper>
		)
	}
}

export default Menu