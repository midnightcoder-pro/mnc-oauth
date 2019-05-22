
# MNC-OAuth is authentication middleware for Node.js
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

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


[npm-image]: https://badge.fury.io/js/twing-markdown.svg
[npm-url]: https://npmjs.org/package/twing-markdown
[travis-image]: https://travis-ci.org/nedkelly/twing-markdown.svg?branch=master
[travis-url]: https://travis-ci.org/nedkelly/twing-markdown
[coveralls-image]: https://coveralls.io/repos/github/nedkelly/twing-markdown/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/nedkelly/twing-markdown?branch=master
