import React from 'react'
import Cookies from 'js-cookie'

import HeaderRoute from './HeaderRoute'

import Error from './../../Views/Error/Error'

const PrivateRoute = ({ component: Component, ...props }) => {
	if (!props.check) {
		if (Cookies.get('auth') !== 'true')
			window.location.href = process.env.REACT_APP_YVIDEO_SERVER + '/auth/cas/redirect' + window.location.origin + props.path
		else
			return <HeaderRoute {...props} component={Component} />
	} else return <Error error='500' message={'This is on us. We\'re very sorry.'} />
}

export default PrivateRoute
