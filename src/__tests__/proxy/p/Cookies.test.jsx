import cookies from '../../../proxy/p/Cookies';

describe('cookie testing', () => {
  it('test set', () => {
    cookies.set('name', 'value', 7, ``, ``)
		expect(document.cookie).toEqual(`name=value`)

		const cookieValue = cookies.get('name')
		expect(cookieValue).toEqual(`value`)

		const cookieValue1 = cookies.get('name1')
		expect(cookieValue1).toEqual(``)

		const allCookieValue =  cookies.getAll( )
		expect(allCookieValue).toEqual({"name": "value"})

		cookies.delete('name', ``, ``)
		expect(document.cookie).toEqual('')

  });
});
