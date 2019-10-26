import React, { Component } from 'react'
import { getInitials } from '../../js/util'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { toggleMenu, toggleModal } from 'redux/actions'

import CreateCollection from 'components/forms/CreateCollection'

import LogoutButton from './LogoutButton'

import { MenuStyled, LinkStyled, Header, UserPic } from './styles'

class Menu extends Component {

	createCollection = () => {
		this.props.toggleModal({ component: CreateCollection })
	}

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

				{
					(isProf || isAdmin) &&
					<>
						<Header>Collections</Header>
						<hr />
						<LinkStyled to='/collections'>View Collections</LinkStyled>
						<LinkStyled to='/manager'>Manage Collections</LinkStyled>
						<LinkStyled to='/manager' onClick={this.createCollection}>Create New Collection</LinkStyled>
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
	toggleMenu,
	toggleModal
}

export default withRouter(connect(mapStateToProps, actionCreators)(Menu))