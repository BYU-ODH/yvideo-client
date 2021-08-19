import React, { useEffect, useState } from 'react'
import Recaptcha from 'react-recaptcha'

const Captcha = props => {
	const {
		handleCaptchaChange
	} = props
	const _reCaptchaRef = React.createRef()

	return (
		<Recaptcha
			required
			sitekey={ process.env.REACT_APP_RECAPTCHA_SITEKEY }
			// site key to config
			render='explicit'
			ref={_reCaptchaRef}
			verifyCallback={handleCaptchaChange}
			expiredCallback={handleCaptchaChange}
			// onChange={setIsPerson(!this.props.isPerson)}
		/>
	)
}

export default Captcha

