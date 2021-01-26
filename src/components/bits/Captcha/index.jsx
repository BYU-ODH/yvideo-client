import React, { useEffect, useState } from 'react'

// import Style, { } from './styles'

import Recaptcha from 'react-recaptcha';

const Captcha = (props) => {
	const [isVerified, setIsVerified] = useState(false)
	const _reCaptchaRef = React.createRef();

	useEffect(() => {

	}, [setIsVerified])

	const verifyCallback = (response) => {
		if (response) {
			setIsVerified(!isVerified)
			props.handleCaptcha(!isVerified)
		}
	}

	return (
		<Recaptcha
			required

			sitekey={ process.env.REACT_APP_RECAPTCHA_SITEKEY }
			// site key to config
			render="explicit"
			verifyCallback={verifyCallback}
			ref={_reCaptchaRef}
		/>
	);

}


export default Captcha

