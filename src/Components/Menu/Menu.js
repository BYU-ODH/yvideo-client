import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import UserPic from './UserPic'
import SignOutButton from './SignOutButton'

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 100%;

	height: 100vh;
	width: 32rem;

	padding: 2.4rem;

	display: flex;
	flex-direction: column;
	
	background-color: white;

	z-index: 32;

	transition: all .4s ease-in-out;

	& > button:first-of-type {
		position: relative;
		left: -8.4rem;
		transition: left .4s ease-in-out;
	}

	&.active {
		left: calc(100% - 32rem);
		box-shadow: 0 -.5rem 3rem 0 rgba(0,0,0,0.25);

		& > button:first-of-type {
			position: relative;
			left: 0;
		}
	}

	& > h4 {
		margin-top: 2.4rem;
		font-weight: 500;
	}

	& > hr {
		margin: 1rem 0;
		border: none;
		border-top: 1px solid #c4c4c4;
		max-width: 27rem;
	}
`,

	SLink = styled(Link)`
		margin-bottom: 1rem;

		text-decoration: none;
		font-weight: 300;

		color: black;

		background: transparent;
		border: none;
	`,

	Header = styled.h4`
		text-transform: uppercase;
		font-weight: 500;
	`,

	Menu = props => {

		const { active, toggleMenu, signOut, isProf, isAdmin } = props.stateVars

		return (
			<Container className={active ? 'active' : ''} onClick={toggleMenu}>

				<UserPic initials='GP' toggleMenu={toggleMenu} />
				<h4>Grant Perdue</h4>
				<hr />
				<SLink to='/word-list'>My Word List</SLink>

				{
					isProf || isAdmin ||
					<SLink to='/collections'>Collections</SLink>
				}

				<SLink as={SignOutButton} signOut={signOut}>Sign out</SLink>

				{
					(isProf || isAdmin) &&
					<React.Fragment>
						<Header>Collections</Header>
						<hr />
						<SLink to='/collection-manager'>Manage Collections</SLink>
						<SLink to='/create-collection'>Create New Collection</SLink>
					</React.Fragment>
				}

				{
					isAdmin &&
					<React.Fragment>
						<Header>Admin</Header>
						<hr />
						<SLink to='/admin-users'>Users</SLink>
						<SLink to='/admin-collections'>Collections</SLink>
						<SLink to='/admin-content'>Content</SLink>
					</React.Fragment>
				}

			</Container>
		)
	}

export default Menu