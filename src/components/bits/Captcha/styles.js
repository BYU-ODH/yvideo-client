import styled from 'styled-components'


const Style = styled.div`
	width: 230px;
	height: 70px;
	display: flex;
	border: 1px solid rgb(118, 118, 118);
	border-radius: 0.5rem;
	justify-content: center;
	align-items: center;
	margin: 2% 0%;

	& input {
		margin-right: 5%;
		width: 20px;
		height: 20px;
	}

	& h3 {
		font-size: 20px;
	}
`


export default Style