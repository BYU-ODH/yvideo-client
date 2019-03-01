import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleMenu } from './../../redux/actions'

import LogoutButton from './LogoutButton'

import { MenuStyled, LinkStyled, Header, UserPicStyled } from './styles'

class Menu extends Component {

	render() {
		const { menuActive, toggleMenu, isProf, isAdmin } = this.props

		return (
			<MenuStyled className={menuActive ? 'active' : ''} onClick={toggleMenu}>

				<UserPicStyled>GP</UserPicStyled>
				<h4>Grant Perdue</h4>
				<hr />
				<LinkStyled to='/word-list'>My Word List</LinkStyled>

				{
					isProf || isAdmin ||
					<LinkStyled to='/collections'>Collections</LinkStyled>
				}

				<LinkStyled as={LogoutButton}>Sign out</LinkStyled>

				{
					(isProf || isAdmin) &&
					<React.Fragment>
						<Header>Collections</Header>
						<hr />
						<LinkStyled to='/collection-manager'>Manage Collections</LinkStyled>
						<LinkStyled to='/create-collection'>Create New Collection</LinkStyled>
					</React.Fragment>
				}

				{
					isAdmin &&
					<React.Fragment>
						<Header>Admin</Header>
						<hr />
						<LinkStyled to='/admin-users'>Users</LinkStyled>
						<LinkStyled to='/admin-collections'>Collections</LinkStyled>
						<LinkStyled to='/admin-content'>Content</LinkStyled>
					</React.Fragment>
				}

			</MenuStyled >
		)
	}
}

const mapStateToProps = state => {
	return {
		isProf: state.userAuth.roles.includes('professor'),
		isAdmin: state.userAuth.roles.includes('admin'),
		isStudent: state.userAuth.roles.includes('student'),
		menuActive: state.menuActive
	}
}

const actionCreators = {
	toggleMenu
}

export default connect(mapStateToProps, actionCreators)(Menu)