import React, { useEffect, useState } from 'react'
import Recaptcha from 'react-recaptcha'

const Captcha = () => {
	const _reCaptchaRef = React.createRef()

	return (
		<Recaptcha
			required
			sitekey={ process.env.REACT_APP_RECAPTCHA_SITEKEY }
			// site key to config
			render='explicit'
			ref={_reCaptchaRef}
		/>
	)
}

export default Captcha

