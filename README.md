
# OAuthJS is authentication middleware for Node.js

## Usage example (with koajs)
```js
let Koa = require('koa')
let aj = require('oauthjs')

// Github oauth
let github = aj.GHStrategy({
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

