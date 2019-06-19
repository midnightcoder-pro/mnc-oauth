
# MNC-OAuth is authentication middleware for Node.js
[![NPM version][npm-image]][npm-url]

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
.get('/github', ctx => {
	ctx.redirect(github.link)
})
.get('/github/callback', async ctx => {
	let {access_token} = await github.authorize(ctx.query.code).catch(console.log)
	let user = await oa.request('https://api.github.com/user?access_token=' + access_token).catch(console.log)
	console.log(user)
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
let TestAppStrategy = ({client_id, client_secret, redirect_uri, scope}) => ({
	link: 'https://oauth.testapp.com?' + qs.stringify({client_id, redirect_uri, scope, response_type: 'code'}),
	authorize: code => oa.oauth('https://oauth.testapp.com/token', {code, client_id, client_secret, redirect_uri})
})

let test = TestAppStrategy({
	client_id: 'client_id',
	client_secret: 'client_secret',
	redirect_uri: 'redirect_uri',
	scope: 'scope'
})
```

[npm-image]: https://badge.fury.io/js/mnc-oauth.svg
[npm-url]: https://npmjs.org/package/mnc-oauth
