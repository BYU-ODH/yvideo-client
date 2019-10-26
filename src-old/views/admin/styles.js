import styled, { css } from 'styled-components'

export const AdminStyled = styled.div`
	display: flex;
`

export const SideMenu = styled.div`
	width: 17rem;
`

export const SideIcons = styled.div`
	width: 5rem;
	height: calc(100vh - 8.4rem);
	background-color: #0582CA;
	margin-top: 8.4rem;
`

export const Content = styled.div`
	width: calc(100% - 22rem);
	height: calc(100vh - 8.4rem);
	background-color: #fafafa;
	margin-top: 8.4rem;
`

export const Selector = styled.div`
	position: absolute;
	width: 17rem;
	height: 4.5rem;
	background-color: #D2E8FF;
	left: 5rem;

	${props => {
			switch (props.position) {
				case `collections`:
					css`top: 17.1rem;`
					break

				case `content`:
					css`top: 24.2rem;`
					break

				default:
					css`top: 10rem;`
					break
			}
		}
	}

	transition: top .5s ease-out;
`

export const SelectorIcons = styled.div`
	position: absolute;
	width: 5rem;
	height: 4.5rem;
	background-color: #036CC1;
	top: calc(8.4rem + 1.6rem);

	transition: top .5s ease-out;
`