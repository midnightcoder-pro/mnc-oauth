
let rp = require('request-promise-native')
let qs = require('querystring')

let oa = module.exports

oa.oauth = (uri, form) => rp.post({uri, json: true, form, headers: {'User-Agent': 'mnc-oauth'}})
oa.request = uri => rp({uri, json: true, headers: {'User-Agent': 'mnc-oauth'}})

oa.VKStrategy = ({client_id, client_secret, redirect_uri, scope, state}) => ({
	link: 'https://oauth.vk.com/authorize?' + qs.stringify({client_id, redirect_uri, scope, response_type: 'code', state}),
	authorize: code => oa.oauth('https://oauth.vk.com/access_token', {code, client_id, client_secret, redirect_uri})
})

oa.FBStrategy = ({client_id, client_secret, redirect_uri, scope, state}) => ({
	link: 'https://www.facebook.com/v3.2/dialog/oauth?' + qs.stringify({client_id, redirect_uri, scope, state}),
	authorize: code => oa.oauth('https://graph.facebook.com/v3.2/oauth/access_token', {code, client_id, client_secret, redirect_uri})
})

oa.GHStrategy = ({client_id, client_secret, redirect_uri, scope, state}) => ({
	link: 'https://github.com/login/oauth/authorize?' + qs.stringify({client_id, redirect_uri, scope, state}),
	authorize: code => oa.oauth('https://github.com/login/oauth/access_token', {code, client_id, client_secret, redirect_uri})
})

oa.GOStrategy = ({client_id, client_secret, redirect_uri, scope, state}) => ({
	link: 'https://accounts.google.com/o/oauth2/v2/auth?' + qs.stringify({client_id, redirect_uri, scope, response_type: 'code', state}),
	authorize: code => oa.oauth('https://www.googleapis.com/oauth2/v4/token', {code, client_id, client_secret, redirect_uri, grant_type: 'authorization_code'})
})

oa.YAStrategy = ({client_id, client_secret, redirect_uri, scope, state}) => ({
	link: 'https://oauth.yandex.ru/authorize?' + qs.stringify({client_id, redirect_uri, scope, response_type: 'code', state}),
	authorize: code => oa.oauth('https://oauth.yandex.ru/token', {code, client_id, client_secret, redirect_uri, grant_type: 'authorization_code'})
})
