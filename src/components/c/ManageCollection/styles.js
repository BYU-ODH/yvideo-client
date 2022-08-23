import styled, { keyframes } from 'styled-components'
import logo from 'assets/hexborder.svg'
import saveIcon from 'assets/save.svg'
import plusIcon from 'assets/plus-white.svg'

const Style = styled.div`
	overflow: auto;

	.fa {
		font-size: 1.9rem;
		margin-right: .4rem;
		}

  & > header {
		height: 12rem;
		padding: 0 3.8rem;
    display: flex;
		align-items: center;
    justify-content: space-between;

    & h6 {
      font-size: 1.8rem;
      font-weight: bold;
    }

    & p {
      color: #a4a4a4;
      margin-top: 1.7rem;
    }

		@media screen and (max-width: 1000px) {
			height: 7rem;
			padding: 2rem 2.5rem;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start
		}
  }
`
export default Style

export const Title = styled.div`
  display: flex;
  align-items: center;
`

export const TitleEdit = styled.input`
  margin-left: -0.3rem;
  font-size: 1.8rem;
  font-weight: bold;
`
export const SaveIcon = styled.span`
  background: url(${saveIcon}) center no-repeat;
  height: 2.5rem;
  width: 2rem;
`

export const TitleEditButton = styled.div`
  color: ${props => props.editing ? `#0582CA` : `#a4a4a4;`};
  font-weight: bold;
  cursor: pointer;
  margin-top: 0;
  margin-left: 1rem;

	display: flex;
  align-items: center;
  justify-content: center;

  text-align: center !important;
  & > span {
    margin-right: .2rem;
  }
`

export const Publish = styled.div`
	@media screen and (max-width: 1000px) {
		margin-top: 2rem;
	}
`

export const PublishButton = styled.button`
  color: white;
  font-weight: bold;
  background-color: ${props => props.published ? `var(--yellow)` : `var(--light-blue)`};
	:hover {
		background-color: ${props => props.published ? `var(--dark-yellow)` : `var(--navy-blue)`};
	}

  letter-spacing: 0.05rem;

  padding: 0.8rem 1.5rem;
  margin-right: 3rem;

  border: none;
  border-radius: 0.3rem;

  cursor: pointer;
`

export const ArchiveButton = styled.button`
  color: var(--red);
	border: 3px solid var(--red);
  font-weight: bold;
	background-color: white;

	:hover {
		background-color: var(--red);
		color: white;
	}

  letter-spacing: 0.05rem;

  padding: 0.55rem 1.5rem;
	border-radius: 0.3rem;

  cursor: pointer;
`
export const CopyrightedButton = styled.button`
  color: #efcc00;
  font-weight: bold;

  letter-spacing: 0.05rem;

  padding: 0;
	margin-left: 3rem;
  background: transparent;

  border: none;
  cursor: pointer;
  outline: none;
`

export const Tab = styled.div`
  background-color: white;
  overflow-y: scroll;

  border-top: 1px solid #c4c4c4;

  padding: 2rem;

  height: calc(100vh - 24.6rem);

	& #expiredTitle {
		padding-left: 2rem;

	}
	hr {
		margin-left: 2rem;
	}
`

export const TabHeader = styled.div`
	position: absolute;
	top: 18rem;

  padding-left: 2rem;

  height: 2.5rem;

  & > button {
    padding: 0;
    width: 10rem;
    background: transparent;
    height: 2.5rem;

    border: none;
    cursor: pointer;
  }

	@media screen and (max-width: 1000px) {
		position: relative;
		top: 0
	}
`

export const Selector = styled.div`
  position: absolute;

  bottom: 0;
  left: ${props => props.isContentTab ? `2rem` : `12rem`};

  transition: left 0.3s ease-in-out;

  height: 0.25rem;
  width: 10rem;

  background-color: #0582ca;
`

export const NewContent = styled.button`
  height: 12rem;
  width: 21rem;
	object-fit: cover;
  object-position: center;

  margin: 2rem;

	@media screen and (max-width: 1000px) {
		margin: 1rem;
	}

  border: none;

  background-color: #aaa;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

	:hover {
		transition: 0.5s;
		background-color: #999;
	}

	& > p{
		font-size: 1.5rem;
		font-weight: lighter;
		text-align: center;
	}
`

export const Icon = styled.div`
  background: url(${plusIcon}) center;
  background-size: 50px;

  height: 2rem;
  width: 2rem;
`

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(720deg);
	}
`

export const Spinner = styled.div`
	background: url(${logo}) center no-repeat;
	background-size: cover;
	width: 15rem;
	height: 15rem;

	position: fixed;
	top: 30%;
	left: 50%;
	display: flex;
	align-items: center;
	justify-content: center;

	animation: ${rotate} 2.5s ease-in-out infinite;
`
