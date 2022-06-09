import styled from 'styled-components'
import plusIcon from 'assets/plus-white.svg'

export const Container = styled.div`
	padding-top: 8.4rem;
	display: flex;

	& #no-collections {
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
		position: relative;
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

export const Help = styled.span`
	width: 20px;
	height: 20px;

	& img {
		width: 20px;
    height: 20px;
    position: absolute;
    right: -3px;
    bottom: 5px;
		cursor: pointer;
	}
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
	cursor: pointer;

	background-color: var(--light-blue);
	color: white;
	font-size: 1.5rem;
  border: none;
  border-radius: 6rem;
	width: 18rem;
  height: 5rem;
	text-align: center;
	align-items: center;
	justify-content: center;
	margin-bottom: 2rem;
	:hover {
			background-color: var(--navy-blue);
		}

		& > span {
		margin-right: 1rem;
	}
`

export const Button = styled.button`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 12rem;
    height: 5rem;
    color: white;
    background-color: var(--light-blue);
    margin-left: 1rem;
		margin-bottom: 2rem;
		margin-top: 2rem;
		padding-right: 1rem;
    outline: none;
    box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
    font-size: 1.5rem;
    border: none;
    border-radius: 6rem;
    text-align: center;
		cursor: pointer;
		transition: .5s ease;
		font-weight: 500;

		:hover {
			background-color: var(--navy-blue);
		}

		& > span {
		margin-right: 1rem;
	}
`

export const FeedbackMessage = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
  transform: translate(-50%, -50%);

	& > p {
		font-weight: 200;
		font-size: 20px;
		margin: auto;
	}
`

export const PlusIcon = styled.span`
	background: url(${plusIcon}) center no-repeat;
	color: white;
	height: 1.5rem;
	width: 1.5rem;
`
