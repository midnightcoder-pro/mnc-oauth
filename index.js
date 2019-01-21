
let rp = require('request-promise-native')
let qs = require('querystring')

let li = module.exports

li.oauth = (uri, form) => rp.post({uri, json: true, form, /*strictSSL: false,*/ headers: {'User-Agent': 'auth'}})
li.getUserInfo = uri => rp({uri, json: true, /*strictSSL: false,*/ headers: {'User-Agent': 'auth'}})

li.VKStrategy = config => ({
	link: 'https://oauth.vk.com/authorize?' + qs.stringify({
		client_id: config.client_id,
		redirect_uri: config.redirect_uri,
		scope: config.scope,
		response_type: 'code'
	}),
	authorize: code =>
		li.oauth('https://oauth.vk.com/access_token', {
			code,
			client_id: config.client_id,
			client_secret: config.client_secret,
			redirect_uri: config.redirect_uri
		})
		.then(async ({access_token, email}) => {
			let data = (await li.getUserInfo('https://api.vk.com/method/users.get?v=5.92&access_token=' + access_token)).response[0]
			data.email = email
			return data
		})
})

li.FBStrategy = config => ({
	link: 'https://www.facebook.com/v3.2/dialog/oauth?' + qs.stringify({
		client_id: config.client_id,
		redirect_uri: config.redirect_uri
	}),
	authorize: code =>
		li.oauth('https://graph.facebook.com/v3.2/oauth/access_token', {
			code,
			client_id: config.client_id,
			client_secret: config.client_secret,
			redirect_uri: config.redirect_uri
		})
		.then(({access_token}) => li.getUserInfo('https://graph.facebook.com/v3.2/me??fields=' + config.fields + '&access_token=' + access_token))
})

li.GHStrategy = config => ({
	link: 'https://github.com/login/oauth/authorize?' + qs.stringify({
		client_id: config.client_id,
		redirect_uri: config.redirect_uri,
		scope: config.scope
	}),
	authorize: code =>
		li.oauth('https://github.com/login/oauth/access_token', {
			code,
			client_id: config.client_id,
			client_secret: config.client_secret,
			redirect_uri: config.redirect_uri
		})
		.then(({access_token}) => li.getUserInfo('https://api.github.com/user?access_token=' + access_token))
})

li.GOStrategy = config => ({
	link: 'https://accounts.google.com/o/oauth2/v2/auth?' + qs.stringify({
		client_id: config.client_id,
		redirect_uri: config.redirect_uri,
		scope: config.scope,
		response_type: 'code'
	}),
	authorize: code =>
		li.oauth('https://www.googleapis.com/oauth2/v4/token', {
			code,
			client_id: config.client_id,
			client_secret: config.client_secret,
			redirect_uri: config.redirect_uri,
			grant_type: 'authorization_code'
		})
		.then(({access_token}) => li.getUserInfo('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + access_token))
})

li.YAStrategy = config => ({
	link: 'https://oauth.yandex.ru/authorize?' + qs.stringify({
		client_id: config.client_id,
		redirect_uri: config.redirect_uri,
		scope: config.scope,
		response_type: 'code'
	}),
	authorize: code =>
		li.oauth('https://oauth.yandex.ru/token', {
			code,
			client_id: config.client_id,
			client_secret: config.client_secret,
			redirect_uri: config.redirect_uri,
			grant_type: 'authorization_code'
		})
		.then(({access_token}) => li.getUserInfo('https://login.yandex.ru/info?oauth_token=' + access_token))
})