import styled from 'styled-components'

const Style = styled.div`
max-width: 100rem;
border-top: 0.5px solid rgba(0, 0, 0, 0.5);
padding: 8.4rem 2.4rem 0 2.4rem;
margin: 0 auto;

& .user-info {
	font-size: 14px;
	width: 30%;
	height: 25px;
	margin: 1% 0%;
	padding: 10px;
	padding: 5px;
	border-radius: 0.5rem;
	border: 1px solid rgb(118, 118, 118);
	background-color: #ffffff;
}

& textarea {
	font-size: 14px;
	width: 100%;
	height: 150px;
	margin: 1% 0%;
	padding: 10px;
	padding: 5px;
	border-radius: 0.5rem;
	border: 1px solid rgb(118, 118, 118);
	background-color: #ffffff;
	::placeholder {
		font-size: 14px;
	}
}

& .submit-file {
	font-size: 14px;
	margin: 1% 0%;
	padding-bottom: 20px;
}

& .btn-submit {
	float: right;
	width: 8rem;
	height: 4rem;
	color: white;
	background-color: var(--light-blue);
	outline: none;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	font-size: 1.5rem;
	border: none;
	border-radius: 1rem;
	text-align: center;
	cursor: pointer;
	transition: .5s ease;
	font-weight: 500;

	:hover {
		background-color: var(--navy-blue);
	}
}
`

export default Style
