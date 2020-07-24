import styled from 'styled-components'

export const Container = styled.div`
	padding-top: 8.4rem;
	display: flex;

	& .no-collections {
		text-align: center;
		width: 80%;
		margin: 5% 10% 2% 10%;
	}

	& #create-button {
		position: absolute !important;
		top: 30%;
		width: 100%;
		display: flex;

		& button {
			margin: auto;
			height: 40px;
			font-size: 2rem;
			width: 20%;
			color: white;
			background-color: var(--light-blue);
			border: none;
			border-radius: 10px;
			cursor: pointer;

			:hover {
				border: 2px solid var(--navy-blue);
			}
		}
	}
`

export const SideMenu = styled.div`
	flex: none;

	border-right: 1px solid #c4c4c4;
	width: 22rem;
	min-height: calc(100vh - 14.4rem);

	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 3rem;

	overflow-y: scroll;

	& > h4 {
		padding: .8rem 0;
		margin-bottom: 1rem;
	}

	& .link {
		height: 4rem;
		width: 100%;
		display: flex;
		align-items: center;
		padding-left: 2rem;
		font-size: 1.3rem;
	}

	& .active-collection {
		background-color: rgba(5, 130, 202, 0.5);
		border-radius: 2px;
	}
`

export const Body = styled.div`
	flex: auto;
	height: calc(100vh - 16rem);
`

export const CreateButton = styled.button`
	padding: 0;

	border: none;
	background: transparent;

	font-weight: normal;
	line-height: 3.7rem;

	height: 3.5rem;

	display: flex;
	align-items: center;

	outline: none;

	cursor: pointer;
`

export const Plus = styled.div`
	height: 1.7rem;
	width: 1.7rem;

	margin-right: 1rem;

	background: url(${props => props.src}) center no-repeat;
	background-size: contain;
`

export const NoCollection = styled.div`
	height: 100%;
	font-size: 2.4rem;
	color: #ccc;

	display: flex;
	align-items: center;
	justify-content: center;
`
