import React, { Component } from 'react'
import { getInitials } from '../../js/util'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { toggleMenu } from './../../redux/actions'

import LogoutButton from './LogoutButton'

import { MenuStyled, LinkStyled, Header, UserPic } from './styles'

class Menu extends Component {

	render() {
		const { user, menuActive, toggleMenu, isProf, isAdmin } = this.props

		return (
			<MenuStyled className={menuActive && `active`} onClick={toggleMenu}>

				<UserPic>{typeof user.name !== `undefined` && getInitials(user.name)}</UserPic>
				<h4>{typeof user.name !== `undefined` && user.name}</h4>
				<hr />
				<LinkStyled to='/word-list'>My Word List</LinkStyled>

				{
					isProf || isAdmin ||
					<LinkStyled to='/collections'>Collections</LinkStyled>
				}

				<LinkStyled as={LogoutButton}>Sign out</LinkStyled>

				<LinkStyled to={`/player/1`}>Player Test</LinkStyled>

				{
					(isProf || isAdmin) &&
					<React.Fragment>
						<Header>Collections</Header>
						<hr />
						<LinkStyled to='/collections'>View Collections</LinkStyled>
						<LinkStyled to='/collection-manager'>Manage Collections</LinkStyled>
						<LinkStyled to='/create-collection'>Create New Collection</LinkStyled>
					</React.Fragment>
				}

				{
					isAdmin &&
					<React.Fragment>
						<Header>Admin</Header>
						<hr />
						<LinkStyled to='/admin/users'>Users</LinkStyled>
						<LinkStyled to='/admin/collections'>Collections</LinkStyled>
						<LinkStyled to='/admin/content'>Content</LinkStyled>
					</React.Fragment>
				}

			</MenuStyled >
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		isProf: state.userInfo.roles.includes(`professor`),
		isAdmin: state.userInfo.roles.includes(`admin`),
		isStudent: state.userInfo.roles.includes(`student`),
		menuActive: state.menuActive
	}
}

const actionCreators = {
	toggleMenu
}

export default withRouter(connect(mapStateToProps, actionCreators)(Menu))