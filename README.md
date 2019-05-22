
# MNC-OAuth is authentication middleware for Node.js
[![npm version][npm-image]][npm-url][![Build status][travis-image]][travis-url][![Test coverage][coveralls-image]][coveralls-url][![Downloads][downloads-image]][downloads-url]

## Usage example (with koajs)
```js
let Koa = require('koa')
let oa = require('mnc-oauth')

// Github oauth
let github = oa.GHStrategy({
	client_id: 'client_id',
	client_secret: 'client_secret',
	redirect_uri: 'redirect_uri',
	scope: 'scope'
})

let auth = new Router()
.prefix('/auth')
.get('/gh', ctx => {
	ctx.redirect(github.link)
})
.get('/gh/callback', async ctx => {
	ctx.body = await github.authorize(ctx.query.code).catch(console.log)
})

// App server
let appServer = new Koa()
appServer.use(auth.routes())
appServer.listen(3000)
```

## Available strategies

 - VKStrategy - vkontakte
 - FBStrategy - facebook
 - GHStrategy - github
 - GOStrategy - google
 - YAStrategy - yandex

## Writing a strategy example

```js
oa.TestAppStrategy = config => ({
	link: 'https://oauth.midnightcoder.pro?' + qs.stringify({
		client_id: config.client_id,
		redirect_uri: config.redirect_uri,
		scope: config.scope,
		response_type: 'code'
	}),
	authorize: code =>
		oa.oauth('https://oauth.testapp.com/token', {
			code,
			client_id: config.client_id,
			client_secret: config.client_secret,
			redirect_uri: config.redirect_uri
		})
		.then(({access_token}) => oa.getUserInfo('https://api.testapp.com/getUserInfo?access_token=' + access_token))
})

let test = oa.TestAppStrategy({
	client_id: 'client_id',
	client_secret: 'client_secret',
	redirect_uri: 'redirect_uri',
	scope: 'scope'
})
```
