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

	& > button {
		position: relative;
		left: -8.4rem;
		transition: left .4s ease-in-out;
	}

	&.active {
		left: calc(100% - 32rem);
		box-shadow: 0 -.5rem 3rem 0 rgba(0,0,0,0.25);

		& > button {
			position: relative;
			left: 0;
		}
	}
`,

	// eslint-disable-next-line sort-vars
	StyledH4 = styled.h4`
		margin-top: 2.4rem;
		font-weight: 500;
	`,

	// eslint-disable-next-line sort-vars
	StyledHr = styled.hr`
		margin: 1rem 0;
		border: none;
		border-top: 1px solid #c4c4c4;
	`,

	// eslint-disable-next-line sort-vars
	StyledLink = styled(Link)`
		margin-bottom: 1rem;

		text-decoration: none;
		font-weight: 300;

		color: black;
	`,

	// eslint-disable-next-line sort-vars
	StyledBoldLink = styled(StyledLink)`
		font-weight: 500;
		text-transform: uppercase;
	`,

	// eslint-disable-next-line sort-vars
	Menu = props => {
		return (
			<StyledMenu className={props.active ? 'active' : ''}>
				<UserPic initials='GP' toggleMenu={props.toggleMenu} />
				<StyledH4>Grant Perdue</StyledH4>
				<StyledHr />
				<StyledLink to='/word-list'>My Word List</StyledLink>
				<StyledLink to='/logout'>Sign out</StyledLink>
				<br />
				<StyledBoldLink to='/collections'>Collections</StyledBoldLink>
			</StyledMenu>
		)
	}

export default Menu