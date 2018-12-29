import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import UserPic from './User/UserPic'

const StyledMenu = styled.div`
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
`,

	StyledH4 = styled.h4`
		margin-top: 2.4rem;
		font-weight: 500;
	`,

	StyledHr = styled.hr`
		margin: 1rem 0;
		border: none;
		border-top: 1px solid #c4c4c4;
	`,

	StyledLink = styled(Link)`
		margin-bottom: 1rem;

		text-decoration: none;
		font-weight: 300;

		color: black;

		background: transparent;
		border: none;
	`,

	StyledBoldLink = styled(StyledLink)`
		font-weight: 500;
		text-transform: uppercase;
	`,

	Menu = props => {
		return (
			<StyledMenu className={props.active ? 'active' : ''}>
				<UserPic initials='GP' toggleMenu={props.toggleMenu} />
				<StyledH4>Grant Perdue</StyledH4>
				<StyledHr />
				<StyledLink to='/word-list'>My Word List</StyledLink>
				<StyledLink as={SignOutButton} signOut={props.signOut}>Sign out</StyledLink>
				<br />
				<StyledBoldLink to='/collections'>Collections</StyledBoldLink>
			</StyledMenu>
		)
	},

	SignOutButton = props => {
		return <StyledButton onClick={props.signOut}>{props.children}</StyledButton>
	},

	StyledButton = styled.button`
		margin-bottom: 1rem;
		padding: 0;

		width: fit-content;

		text-decoration: none;
		outline: none;
		font-weight: 300;

		color: black;

		background: transparent;
		border: none;

		cursor: pointer;
	`

export default Menu