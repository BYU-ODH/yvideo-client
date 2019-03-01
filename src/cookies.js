class cookies {

	set = (cookie_name, cookie_value, max_days, path, domain) => {
		const d = new Date()
		d.setTime(d.getTime() + max_days * 24 * 60 * 60 * 1000)
		const expires = 'expires=' + d.toUTCString()
		document.cookie = cookie_name + '=' + cookie_value +
			(path ? ';path=' + path : '') +
			(domain ? ';domain=' + domain : '') +
			';' + expires
	}

	get = cookie_name => {
		const name = cookie_name + '='
		const decodedCookie = decodeURIComponent(document.cookie)
		const ca = decodedCookie.split(';')
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i]
			while (c.charAt(0) === ' ')
				c = c.substring(1)
			if (c.indexOf(name) === 0)
				return c.substring(name.length, c.length)
		}
		return ''
	}

	getAll = () => {
		return document.cookie
			.split(';')
			.reduce((res, c) => {
				const [key, val] = c.trim().split('=').map(decodeURIComponent)
				try {
					return Object.assign(res, { [key]: JSON.parse(val) })
				} catch (e) {
					return Object.assign(res, { [key]: val })
				}
			}, {})
	}

	delete = (cookie_name, path, domain) => {
		if (this.get(cookie_name)) {
			document.cookie = cookie_name + '=' +
				(path ? ';path=' + path : '') +
				(domain ? ';domain=' + domain : '') +
				';expires=Thu, 01 Jan 1970 00:00:01 GMT'
		}
	}
}

export default new cookies()