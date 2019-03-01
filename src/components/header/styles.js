import styled from 'styled-components'

export const HeaderContainer = styled.div`
height: 8.4rem;
width: 100%;
/* box-shadow: 0 -.5rem 3rem 0 rgba(0,0,0,0.25); */
/* padding: 0 2.4rem; */
display: flex;
align-items: center;
justify-content: space-between;

position: fixed;
background-color: ${props => props.lost ? 'transparent' : 'white'};

z-index: 16;

& > button {
	background-color: #0157b8;
	border: none;
	color: white;
	padding: 1rem;
	border-radius: .3rem;
	margin-right: 7.4rem;
	cursor: pointer;
}
`
